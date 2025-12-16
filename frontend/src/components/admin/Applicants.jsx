import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setAllApplicants } from '@/redux/applicationSlice'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })
                dispatch(setAllApplicants(res.data.job.applications))
            } catch (error) {
                console.error('Error fetching applicants:', error)
            }
        }
        fetchAllApplicants()
    }, [dispatch, params.id])

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <motion.div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="mb-8 bg-white shadow-lg">
                    <CardHeader className="bg-gray-200">
                        <CardTitle className="text-2xl font-bold flex items-center text-gray-800">
                            <Users className="mr-2" />
                            Applicants ({applicants?.length || 0})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <ApplicantsTable />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default Applicants

