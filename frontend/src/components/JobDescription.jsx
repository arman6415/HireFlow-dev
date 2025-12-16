import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, Users, DollarSign, Clock } from 'lucide-react'

const JobDescription = () => {
  const params = useParams()
  const jobId = params.id
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      console.log("Applying to jobId:", jobId);
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true })
      if (res.data.success) {
        setIsApplied(true)
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updateSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(application => application.applicant == user?._id))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-4xl mx-auto my-10 bg-white shadow-xl rounded-lg overflow-hidden'
    >
      <div className='bg-gray-800 text-white p-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='font-bold text-3xl mb-2'>{singleJob?.title}</h1>
            <div className='flex items-center gap-2 mt-4'>
              <Badge className='bg-gray-700 text-gray-200 hover:bg-gray-600'>{singleJob?.position} Positions</Badge>
              <Badge className='bg-gray-700 text-gray-200 hover:bg-gray-600'>{singleJob?.jobType}</Badge>
              <Badge className='bg-gray-700 text-gray-200 hover:bg-gray-600'>{singleJob?.salary} LPA</Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-full px-6 py-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-200'
            }`}
          >
            {isApplied ? 'Applied' : 'Apply'}
          </Button>
        </div>
      </div>
      
      <div className='p-8'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2'>Service Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <InfoItem icon={<Briefcase className="text-gray-600" />} label="Role" value={singleJob?.title} />
          <InfoItem icon={<MapPin className="text-gray-600" />} label="Location" value={singleJob?.location} />
          <InfoItem icon={<DollarSign className="text-gray-600" />} label="Salary" value={`${singleJob?.salary} LPA`} />
          <InfoItem icon={<Clock className="text-gray-600" />} label="Experience" value={`${singleJob?.experience} Yrs`} />
          <InfoItem icon={<Users className="text-gray-600" />} label="Total Applicants" value={singleJob?.applications?.length} />
          <InfoItem icon={<Calendar className="text-gray-600" />} label="Posted Date" value={singleJob?.createdAt.split("T")[0]} />
        </div>
        
        <div className='mt-8'>
          <h3 className='text-xl font-semibold mb-4 text-gray-800'>Description</h3>
          <p className='text-gray-600 leading-relaxed'>{singleJob?.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className='flex items-center space-x-3'>
    {icon}
    <div>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='font-semibold text-gray-800'>{value}</p>
    </div>
  </div>
)

export default JobDescription

