import React, { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AssetRequest = () => {

    const axiosSecure=useAxiosSecure();
    const {user,loading}=use(AuthContext);

    const { data:request=[],refetch,isLoading }=useQuery({
        queryKey:['asset-requests',user?.email],
        enabled:!!user?.email && !loading,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/requests?hrEmail=${user.email}`);
            return res.data;
        }
    })

    const handleApprove=(req)=>{
        axiosSecure.patch(`/requests-approve/${req._id}`,req)
        .then((res)=>{
           
        if (res.data?.requestUpdate?.modifiedCount > 0 && res.data?.assignedAsset.insertedId)
            {
                refetch();
               toast.success("Request Approved Successfully");
            }
            else
            {
              toast.error(`${res.data.message}`);
            }
        })


    }


    const handleReject=(req)=>
    {
        axiosSecure.patch(`/requests-reject/${req._id}`,req)
        .then((res)=>
        {
         
             if(res.data.result?.modifiedCount>0)
            {
                refetch();
              

              
                toast.success("Request Rejected Successfully");
            }
        })

    }
    if(loading || isLoading)
    return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>);




  return (
    <div>
         <h2 className="text-3xl font-bold text-center mb-2 text-black  ">All Requests</h2>

            <div className="overflow-x-auto mt-16">
    <table className="table text-black text-xl w-full mx-4 mt-8">
        <thead>
            <tr className='text-black text-2xl'>
                <th>#</th>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Asset Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                request.map((req,index)=> <tr key={req._id}>
                <th>{index+1}</th>
                <td>{req.requesterName}</td>
                <td>{req.requesterEmail}</td>
                <td>{req.assetName}</td>
                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                <td>{req.requestStatus}</td>
              <td>
  {req.requestStatus === "approved" && (
    <span className="btn btn-sm btn-primary cursor-default">Approved</span>
  )}
  {req.requestStatus === "rejected" && (
    <span className="btn btn-sm btn-error cursor-default">Rejected</span>
  )}
  {req.requestStatus === "Pending" && (
    <>
      <button className="btn btn-sm btn-primary" onClick={() => handleApprove(req)}>Approve</button>
      <button className="btn btn-sm btn-secondary ml-2" onClick={() => handleReject(req)}>Deny</button>
    </>
  )}
</td>

            </tr>)
            }
        </tbody>
    </table>

</div>
    </div>
  );
};

export default AssetRequest;