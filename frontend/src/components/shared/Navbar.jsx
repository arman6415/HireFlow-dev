import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                <h1
  onClick={() => window.location.href = 'http://localhost:5173/'}
  className="text-2xl font-bold text-gray-900"
>
  Hire<span className="text-gray-600">Flow</span>
</h1>

                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='text-gray-700 hover:text-gray-900 transition-colors'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='text-gray-700 hover:text-gray-900 transition-colors'>Services</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='text-gray-700 hover:text-gray-900 transition-colors'>Home</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to={"/login"}><Button className='bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors'>Login</Button></Link>
                                <Link to={"/signup"}><Button className='bg-gray-900 text-white hover:bg-gray-800 transition-colors'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                <Avatar className="cursor-pointer border border-gray-300 h-8 w-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                                        <AvatarImage className="h-full w-full object-cover" src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                                        <AvatarFallback className="text-gray-700 text-xs">
                                            {user?.fullname?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 mt-2 p-0 bg-transparent border-none' style={{ zIndex: 9999 }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className='rounded-lg overflow-hidden shadow-lg'
                                    >
                                        <div className='bg-gray-900 p-4'>
                                            <div className='flex items-center gap-4 '>
                                                <Avatar className="cursor-pointer border-2 border-white h-16 w-16 rounded-full overflow-hidden">
                                                    <AvatarImage className="h-full w-full object-cover" src={user?.profile?.profilePhoto} alt={user?.fullname || 'User'} />
                                                    <AvatarFallback className="bg-gray-200 text-gray-700 text-xl font-bold flex items-center justify-center">
                                                        {user?.fullname?.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-bold text-lg text-white'>{user?.fullname}</h4>
                                                    <p className='text-sm text-gray-300'>{user?.profile?.bio || 'No bio available'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bg-white p-4'>
                                            <div className='flex flex-col gap-3'>
                                                {user && user.role === 'student' && (
                                                    <button>
                                                        <Link to="/profile" className='flex items-center gap-2 text-gray-100 hover:text-gray-900 transition-colors'>
                                                        <User2 className='h-5 w-5' />
                                                        <span>View Profile</span>
                                                    </Link>
                                                    </button> 
                                                )}
                                                <button onClick={logoutHandler} className='flex items-center gap-2 text-gray-100 hover:text-gray-900 transition-colors'>
                                                    <LogOut className='h-5 w-5' />
                                                    <span>Log out</span>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;

