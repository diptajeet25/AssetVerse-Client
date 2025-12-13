import React, { use } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
    const axiosSecure=useAxiosSecure();
    const {user}=use(AuthContext);

    const { data,isLoading }= useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: async()=>
        {
            const res=await axiosSecure.get(`/user?email=${user?.email}`)
            return res.data;

        }
    
    })
const role=data?.role;
  return { role ,isLoading};
}; 

export default useRole;