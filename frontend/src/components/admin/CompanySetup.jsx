import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Building, Globe, MapPin, FileImage } from 'lucide-react'

import Navbar from '../shared/Navbar'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import useGetCompanyById from '@/hooks/useGetCompanyById'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies")
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <motion.div 
        className="max-w-2xl mx-auto py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gray-900 text-white">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => navigate("/admin/companies")} 
                variant="ghost" 
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <CardTitle className="text-2xl font-bold">Company Setup</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    className="pl-10 border border-gray-300 focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="border border-gray-300 focus:border-gray-500"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium text-gray-700">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="website"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    className="pl-10 border border-gray-300 focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="pl-10 border border-gray-300 focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo" className="text-sm font-medium text-gray-700">Logo</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('logo').click()}
                    className="w-full border border-gray-300 hover:border-gray-500"
                  >
                    <FileImage className="mr-2 h-4 w-4" />
                    {input.file ? 'Change Logo' : 'Upload Logo'}
                  </Button>
                </div>
                {input.file && (
                  <p className="text-sm text-gray-500 mt-1">{input.file.name}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : 'Update Company'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default CompanySetup

