import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/constant';

const AuthChecker = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/auth-status`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setUser(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkAuth();
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthChecker;
