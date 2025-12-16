import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import axios from "axios";
import useragent from "useragent";
import nodemailer from "nodemailer";

// -------------------- EMAIL TRANSPORTER --------------------
const transporter = nodemailer.createTransport({
    secure: true,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

function sendMail(to, sub, msg) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg,
    });
}

// -------------------- IP LOCATION --------------------
const getLocationFromIP = async (ip) => {
    try {
        const response = await axios.get(
            `https://ipinfo.io?token=${process.env.IPINFO_TOKEN}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching location:", error.message);
        return { city: "Unknown", region: "Unknown", country: "Unknown" };
    }
};

// -------------------- REGISTER --------------------
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: false,
            });
        }

        // 🔥 Safety check for file upload
        if (!req.file) {
            return res.status(400).json({
                message: "Profile photo is required",
                success: false,
            });
        }

        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "email already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            },
        });

        sendMail(
            email,
            `Hi ${fullname}, You have successfully registered your account`,
            `We Welcome you`
        );

        return res.status(201).json({
            message: "Account created",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "something is missing",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "email or password is incorrect",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        const ipAddress =
            req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const deviceInfo = useragent.parse(req.headers["user-agent"]).toString();
        const location = await getLocationFromIP(ipAddress);

        const emailBody = `
            <h1>Login Alert</h1>
            <p>You logged into your account.</p>
            <ul>
                <li><b>Device:</b> ${deviceInfo}</li>
                <li><b>IP Address:</b> ${ipAddress}</li>
                <li><b>Location:</b> ${location.city}, ${location.region}, ${location.country}</li>
            </ul>
        `;

        sendMail(user.email, "Login Alert", emailBody);

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "Lax",
                secure: process.env.NODE_ENV === "production",
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------- LOGOUT --------------------
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { 
            maxAge: 0,
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
         }).json({
            message: "Log out success",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const authStatus = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        return res.status(200).json({
            user,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------- UPDATE PROFILE --------------------
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOrignalName = file.originalname;
        }

        await user.save();

        return res.status(200).json({
            message: "profile updated",
            user,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
