import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { setSearchedQuery } from '@/redux/jobSlice'
import userGetAllJobs from '@/hooks/userGetAllJobs'

const Jobs = () => {
  const { allJobs } = useSelector(store => store.job);
  console.log("Jobs.jsx allJobs state:", allJobs);
  const dispatch = useDispatch();
  userGetAllJobs(); // Call the hook here

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Navbar />
      <div className='max-w-7xl mx-auto pt-20 px-4 '>
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-center leading-tight mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our{' '}
          <span className="text-gray-600">Services</span>
        </motion.h1>
        <div className='flex gap-5'>
          {/* <div className='w-1/5 hidden md:block'>
            <FilterCard />
          </div> */}
          {allJobs.length <= 0 ? (
            <motion.div 
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-2xl text-gray-600 font-semibold">No services found</span>
            </motion.div>
          ) : (
            <div className='flex-1 h-[calc(100vh-12rem)] overflow-y-auto pb-5 pr-4'>
              <motion.div 
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {allJobs.map((job, index) => (
                  <motion.div 
                    key={job?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Jobs
