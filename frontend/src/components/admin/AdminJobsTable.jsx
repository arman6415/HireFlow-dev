import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Calendar, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    })
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  const deleteJobHandler = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAllAdminJobs(allAdminJobs.filter(job => job._id !== jobId)));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (!Array.isArray(filterJobs) || filterJobs.length === 0) {
    return <span className="text-gray-500 font-semibold">Job Not Found!</span>;
  }

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg bg-white">
      <Table className="w-full">
        <TableCaption>A list of your posted Services</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-900">
            <TableHead className="text-gray-200">Company Name</TableHead>
            <TableHead className="text-gray-200">Role</TableHead>
            <TableHead className="text-gray-200">Date</TableHead>
            <TableHead className="text-right text-gray-200">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <TableRow key={job._id} className="hover:bg-gray-100 transition-colors duration-300">
              <TableCell className="font-medium">{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-medium">
                  <Calendar className="w-3 h-3" />
                  {job?.createdAt.split("T")[0]}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-300">
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                  </PopoverTrigger>
                                    <PopoverContent className="w-40 bg-white border border-gray-200 shadow-lg">
                                      <div
                                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                        className="flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-gray-100 transition-colors duration-300 rounded"
                                      >
                                        <Eye className="w-4 text-gray-600" />
                                        <span className="text-gray-800">Applicants</span>
                                      </div>
                                      <div
                                        onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                        className="flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-gray-100 transition-colors duration-300 rounded"
                                      >
                                        <Edit2 className="w-4 text-gray-600" />
                                                              <span className="text-gray-800">Edit</span>
                                                            </div>
                                                            <div
                                                              onClick={() => deleteJobHandler(job._id)}
                                                              className="flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-red-100 transition-colors duration-300 rounded"
                                                            >
                                                              <Trash2 className="w-4 text-red-600" />
                                                              <span className="text-red-800">Delete</span>
                                                            </div>
                                                          </PopoverContent>                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;

