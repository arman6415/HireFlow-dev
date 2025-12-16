import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)
    const navigate = useNavigate()

    return (
        <section className='text-center min-h-screen pt-16 flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 p-8'>
            <div className='flex flex-col gap-8 w-full max-w-7xl'>
                <motion.h1 
                    className='text-5xl md:text-7xl font-extrabold leading-tight'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Latest & Top{' '}
                    <span className='text-gray-600'>Service Openings</span>
                </motion.h1>
                
                {allJobs.length <= 0 ? (
                    <motion.div 
                        className='text-center text-2xl text-gray-600'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        No Services available
                    </motion.div>
                ) : (
                    <motion.div 
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {allJobs?.slice(0, 6).map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
                
                <motion.div 
                    className='text-center mt-12'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Button 
                        onClick={() => navigate('/browse')}
                        className="h-15 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg transition-all duration-300 rounded-full shadow-lg transform hover:scale-105"
                    >
                        <Search className='h-6 w-6 mr-2'/> View All Services
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

export default LatestJobs
