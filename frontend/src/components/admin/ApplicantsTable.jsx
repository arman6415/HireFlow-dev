import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { motion } from 'framer-motion'
import { MoreHorizontal, FileText, Check, X } from 'lucide-react'

import { APPLICATION_API_END_POINT } from '@/utils/constant'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const shortListingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
            
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <motion.div 
            className="w-full overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-800 text-white">
                        <TableHead className="text-white">Full Name</TableHead>
                        <TableHead className="text-white">Email</TableHead>
                        <TableHead className="text-white">Contact</TableHead>
                        <TableHead className="text-white">Resume</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-right text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants.map((item) => (
                        <TableRow key={item._id} className="hover:bg-gray-100 transition-colors duration-200">
                            <TableCell className="font-medium">{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a 
                                        className="text-blue-600 hover:text-blue-800 flex items-center" 
                                        href={item?.applicant?.profile?.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <FileText className="mr-1 h-4 w-4" />
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">NA</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">
                                    {new Date(item?.applicant?.createdAt).toLocaleDateString()}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        {shortListingStatus.map((status, index) => (
                                            <Button
                                                key={index}
                                                variant="ghost"
                                                className="w-full justify-start text-white hover:text-white"
                                                onClick={() => statusHandler(status, item?._id)}
                                            >
                                                {status === "Accepted" ? (
                                                    <Check className="mr-2 h-4 w-4 text-green-500" />
                                                ) : (
                                                    <X className="mr-2 h-4 w-4 text-red-500" />
                                                )}
                                                {status}
                                            </Button>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    )
}

export default ApplicantsTable

