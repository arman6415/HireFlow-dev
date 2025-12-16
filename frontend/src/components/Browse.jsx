import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import Navbar from './shared/Navbar'
import Job from './Job'
import { setSearchedQuery } from '@/redux/jobSlice'
import userGetAllJobs from '@/hooks/userGetAllJobs'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Browse = () => {
  userGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className='max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 my-8 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Search Results 
                <span className="ml-2 text-gray-600">({allJobs.length})</span>
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div 
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {allJobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Job job={job} />
            </motion.div>
          ))}
        </motion.div>

        {allJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-gray-700 text-xl mt-10"
          >
            No jobs found. Try adjusting your search criteria.
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Browse

