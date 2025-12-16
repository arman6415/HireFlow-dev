import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='p-6 rounded-lg shadow-xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300'
    >
      <div className='flex items-start gap-4 mb-4'>
        <Avatar className="h-16 w-16 border-2 border-gray-200">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div className='flex-1'>
          <div className='flex justify-between items-start mb-2'>
            <div>
              <h1 className='text-xl font-bold text-gray-900'>{job?.company?.name}</h1>
              <h2 className='font-semibold text-gray-700'>{job?.title}</h2>
            </div>
            <Button variant="outline" className="rounded-full hover:bg-gray-100 transition-colors duration-300" size="icon">
              <Bookmark className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
          <div className='flex items-center gap-4 text-sm text-gray-500'>
            <span className='flex items-center'>
              <MapPin className="h-4 w-4 mr-1" /> India
            </span>
            <span className='flex items-center'>
              <Clock className="h-4 w-4 mr-1" />
              {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
            </span>
          </div>
        </div>
      </div>

      <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{job?.description}</p>

      <div className='flex flex-wrap items-center gap-2 mb-4'>
        <Badge className='bg-gray-100 text-gray-700 hover:bg-gray-200'>{job?.position} Positions</Badge>
        <Badge className='bg-gray-100 text-gray-700 hover:bg-gray-200'>{job?.jobType}</Badge>
        <Badge className='bg-gray-100 text-gray-700 hover:bg-gray-200'>{job?.salary} LPA</Badge>
      </div>

      <div className='flex items-center gap-4'>
        <Button 
          onClick={() => navigate(`/description/${job?._id}`)} 
          variant="outline"
          className="flex-1 hover:bg-gray-100 transition-colors duration-300"
        >
          Details
        </Button>
        <Button 
          variant="default" 
          className="flex-1 bg-black hover:bg-gray-800 text-white transition-all duration-300"
        >
          Save for later
        </Button>
      </div>
    </motion.div>
  )
}

export default Job

