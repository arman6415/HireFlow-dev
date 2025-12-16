import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Search, Building2 } from 'lucide-react'

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <motion.div 
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <Building2 className="mr-2 h-6 w-6 text-gray-600" />
              Companies Management
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
              <div className="relative w-full sm:w-64">
                <Input
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 focus:border-gray-500 rounded-md"
                  placeholder="Filter by name"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <Button 
                onClick={() => navigate("/admin/companies/create")}
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center"
              >
                <PlusCircle className="mr-2" size={20} />
                New Company
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Company List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <CompaniesTable />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Companies

