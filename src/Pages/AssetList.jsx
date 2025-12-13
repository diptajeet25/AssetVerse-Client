import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AssetList = () => {
    const {user}=use(AuthContext);
    const axiosSecure=useAxiosSecure();
  

  const { data: asset=[]}=useQuery({
    queryKey: ['assets',user?.email],
    queryFn: async()=>
    {
        const res=await axiosSecure.get(`/assets?hrEmail=${user.email}`)
         return res.data;
        
    }
  });
 

  return (
    <div className='text-black'>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">My Asset: {asset.length}</h2>
    </div>
  );
};

export default AssetList;