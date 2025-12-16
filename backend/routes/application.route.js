import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { applyJob, getApplicants, getAppliedJobs, updateStatus, getCompanyApplicants } from "../controllers/application.controller.js";

const router=express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/company/:id/applicants").get(isAuthenticated, getCompanyApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;