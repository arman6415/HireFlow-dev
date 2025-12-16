import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)} 
      className='bg-gradient-to-br from-card to-card/80 border border-border p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 group'
    >
      <div className='mb-3 flex justify-between items-start'>
        <div>
          <h1 className='text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300'>{job?.company?.name}</h1>
          <p className='text-muted-foreground flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            India
          </p>
        </div>
        <div className='bg-primary/10 p-2 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div className='mb-4'>
        <h1 className='text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary/90 transition-colors duration-300'>{job?.title}</h1>
        <p className='text-card-foreground/80 line-clamp-2'>{job?.description}</p>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Badge className='bg-primary/20 text-primary-foreground font-semibold px-3 py-1 rounded-full transition-colors duration-300 hover:bg-primary/30'>
          {job?.position} Positions
        </Badge>
        <Badge className='bg-secondary/20 text-secondary-foreground font-semibold px-3 py-1 rounded-full transition-colors duration-300 hover:bg-secondary/30'>
          {job?.jobType}
        </Badge>
        <Badge className='bg-accent/20 text-accent-foreground font-semibold px-3 py-1 rounded-full transition-colors duration-300 hover:bg-accent/30'>
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
