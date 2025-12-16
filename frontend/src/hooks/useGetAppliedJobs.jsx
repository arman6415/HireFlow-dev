import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import { setAllAppliedJobs } from "@/redux/jobSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs=()=>{
    const dispatch= useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                console.log("Fetched Jobs:", res.data);  // Log the API response to check the structure
                
                // if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application));  // Dispatching the payload (ensure 'application' exists)
                // } else {
                //     console.log("Failed to fetch jobs:", res.data.message);
                // }
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            }
        };
        
        fetchAppliedJobs();
    },[])
}

export default useGetAppliedJobs;