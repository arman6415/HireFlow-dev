"use client"

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Mail, Phone, Pen, Briefcase, MapPin, LinkIcon } from 'lucide-react'

import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className='max-w-6xl mx-auto pt-20 px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <Card className="md:col-span-1 h-fit">
                        <CardHeader className="text-center relative pb-24">
                            <Avatar className="h-32 w-32 absolute left-1/2 transform -translate-x-1/2 -bottom-16 border-4 border-white shadow-lg">
                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </CardHeader>
                        <CardContent className="pt-20">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">{user?.fullname}</h2>
                                <p className="text-gray-500 mt-1">{user?.profile?.bio}</p>
                            </div>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <Mail className="h-5 w-5" />
                                    <span>{user?.email}</span>
                                </div>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <Phone className="h-5 w-5" />
                                    <span>{user?.phoneNumber}</span>
                                </div>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <MapPin className="h-5 w-5" />
                                    <span>{user?.profile?.location || 'Location not set'}</span>
                                </div>
                                <div className='flex items-center gap-3 text-gray-600'>
                                    <LinkIcon className="h-5 w-5" />
                                    <a href={user?.profile?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        {user?.profile?.website || 'Website not set'}
                                    </a>
                                </div>
                            </div>
                            <Button onClick={() => setOpen(true)} variant="outline" className="w-full mt-6">
                                <Pen className="h-4 w-4 mr-2" /> Edit Profile
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-800">Candidate Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-6'>
                                <div>
                                    <h3 className='text-lg font-semibold mb-2 text-gray-700'>Skills</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {user?.profile?.skills.length !== 0 
                                            ? user?.profile?.skills.map((item, index) => 
                                                <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-700">{item}</Badge>
                                              ) 
                                            : <span className="text-gray-500">No skills listed</span>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-2 text-gray-700'>Resume</h3>
                                    {user?.profile?.resume 
                                        ? <a 
                                            href={user.profile.resume} 
                                            target='_blank' 
                                            rel="noopener noreferrer" 
                                            className='text-blue-500 hover:underline flex items-center'
                                          >
                                            <LinkIcon className="h-4 w-4 mr-2" />
                                            View Resume
                                          </a> 
                                        : <span className="text-gray-500">No resume uploaded</span>
                                    }
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-2 text-gray-700'>About Me</h3>
                                    <p className="text-gray-600">{user?.profile?.about || 'No information provided'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                                <Briefcase className="h-5 w-5 text-gray-600" />
                                Applied Services
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AppliedJobTable />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile




