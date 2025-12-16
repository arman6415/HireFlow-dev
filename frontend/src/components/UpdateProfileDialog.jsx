import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2, Upload } from 'lucide-react'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: user?.profile?.resume || ''
    })

    const changeEventHandler = (e) => {
        const { name, value } = e.target
        if (name === "skills") {
            setInput({
                ...input,
                [name]: value,
            })
        } else {
            setInput({ ...input, [name]: value })
        }
    }

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0]
        setInput({...input, file: file || null})
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "An error occurred")
        } finally {
            setLoading(false)
        }
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-gray-900">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullname" className="text-gray-700">Name</Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="border-gray-300 focus:border-gray-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="border-gray-300 focus:border-gray-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="border-gray-300 focus:border-gray-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="border-gray-300 focus:border-gray-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="skills" className="text-gray-700">Skills (comma-separated)</Label>
                        <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className="border-gray-300 focus:border-gray-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="file" className="text-gray-700">Resume (PDF)</Label>
                        <div className="flex items-center space-x-2">
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById('file')?.click()}
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                {input.file ? 'Change File' : 'Upload Resume'}
                            </Button>
                        </div>
                        {input.file && (
                            <p className="text-sm text-gray-600 mt-1">{input.file.name}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button 
                            type="submit" 
                            className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : 'Update Profile'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog

