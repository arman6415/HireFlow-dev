"use client"

import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { Eye, EyeOff, Loader2, Upload, User, Mail, Phone, Lock } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { motion } from 'framer-motion'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const [errors, setErrors] = useState({});
  const { loading } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInput = () => {
    let newErrors = {};
    if (/\d/.test(input.fullname)) {
      newErrors.fullname = "Name should not contain digits";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!/^\d{10}$/.test(input.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("avatar", input.file)
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Join HireFlow</h2>
            <p className="text-gray-300">Create an account to access our platform and elevate your career.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-md'
          >
            <form onSubmit={submitHandler} className='bg-white shadow-2xl rounded-lg p-8 space-y-6'>
              <h1 className='font-bold text-3xl mb-6 text-center text-gray-900 lg:hidden'>Join HireFlow</h1>

              <div className='space-y-2'>
                <label className="text-sm font-medium text-gray-700" htmlFor="fullname">Full Name</label>
                <div className="relative">
                  <input
                    id="fullname"
                    className='w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    type="text"
                    value={input.fullname}
                    name='fullname'
                    onChange={changeEventHandler}
                    placeholder='John Doe'
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
              </div>

              <div className='space-y-2'>
                <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    className='w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    type="email"
                    value={input.email}
                    name='email'
                    onChange={changeEventHandler}
                    placeholder='johndoe@example.com'
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className='space-y-2'>
                <label className="text-sm font-medium text-gray-700" htmlFor="phoneNumber">Phone Number</label>
                <div className="relative">
                  <input
                    id="phoneNumber"
                    className='w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    type="tel"
                    value={input.phoneNumber}
                    name='phoneNumber'
                    onChange={changeEventHandler}
                    placeholder='1234567890'
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div className='space-y-2'>
                <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    className='w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    name='password'
                    onChange={changeEventHandler}
                    placeholder='Your secure password'
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-center space-x-6'>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name='role' 
                    value="student" 
                    className='form-radio text-gray-600' 
                    checked={input.role === 'student'} 
                    onChange={changeEventHandler} 
                  />
                  <span className="ml-2">Student</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name='role' 
                    value="recruiter" 
                    className='form-radio text-gray-600' 
                    checked={input.role === 'recruiter'} 
                    onChange={changeEventHandler} 
                  />
                  <span className="ml-2">Recruiter</span>
                </label>
              </div>

              <div className='space-y-2'>
                <label className="text-sm font-medium text-gray-700">Profile Image</label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept='image/*'
                      onChange={changeFileHandler}
                    />
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-md transition duration-300 shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                    Please Wait
                  </>
                ) : 'Sign Up'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className='font-medium text-gray-900 hover:text-gray-700 transition duration-200'>
                  Login
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Signup

