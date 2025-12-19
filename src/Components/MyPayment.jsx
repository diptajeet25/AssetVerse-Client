import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const MyPayment = ({payment}) => {

    const {user,loading}=use(AuthContext);
    const axiosSecure=useAxiosSecure();
    const {data:payments=[],isLoading}=useQuery(
        {
            queryKey:['my-payments',user?.email],
            enabled: !!user?.email && !payment,
            refetchOnWindowFocus:true,

            queryFn:async()=>{
                const res=await axiosSecure.get(`/payments?hrEmail=${user.email}`);
               
                return Array.isArray(res.data) ? res.data : [];
                
        }
    }
        
    )

    if(loading)
        return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
            Please wait...
        </p>
        </div>
        </div>

    
        )
 
        return (
    <div>
        <h2 className="text-3xl font-bold text-center mt-24 mb-16 text-black">My Payments</h2>
        <div className="overflow-x-auto">
    <table className="table  w-full">
        {/* head */}
        <thead className='text-black text-3xl'>
            <tr className='text-center font-bold'>
            <th>#</th>
            <th>Transaction ID</th>
            <th>Package Name</th>
            <th>Amount</th>
            <th>Date</th>
            </tr>
        </thead>
        <tbody className='text-black'>
            {payments.length === 0 && !isLoading && (

    <tr>
        <td colSpan="5" className="text-center text-gray-500">
            No payments found
        </td>
    </tr>
    )}
            {payments.map((payment,index)=>(
                <tr key={payment._id} className='text-center text-lg'>
                    <td>{index+1}</td>
                    <td>{payment.paymentIntent}</td>
                    <td>{payment.packageName}</td>
                    <td>${payment.packagePrice}</td>
                    <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                </tr>
            ))}
        </tbody>
    </table>
        </div>


    </div>
  );
};

export default MyPayment;