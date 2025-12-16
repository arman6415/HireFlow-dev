import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const filterData=[
  {
    filterType:"Location",
    array:["Delhi NCR", "Banglore", "Hyderabad","Pune","Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40K", "42-1lakh", "1lakhto 5lakh"]
  },
]


const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md '>
      <h1 className='text-lg font-bold'>Filter Services</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className='text-lg font-medium'>{data.filterType}</h1>
              {
                data.array.map((item,index)=>{
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      {/* <RadioGroupItem value={item}/> */}
                      
                      <label htmlFor="">{item}</label>
                    </div>  
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
