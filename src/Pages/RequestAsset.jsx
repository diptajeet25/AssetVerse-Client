import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';

const RequestAsset = () => {
    const axiosSecure=useAxiosSecure();
    const [assets,setAssets]=useState({});
    const {user}=use(AuthContext);
    const modalref=useRef();
    const { data }=useQuery(
        {
            queryKey: ['users', user?.email],
            enabled: !!user?.email,
            queryFn: async()=>{
                const res=await axiosSecure.get(`user?email=${user.email}`);
                return res.data;
            }
        }
    )
    const userInfo=data;

     const {data: asset=[],refetch,isLoading}=useQuery(
        {
            queryKey: ['assets'],
            queryFn: async()=>{
                const res=await axiosSecure.get("/allassets");
                  if (Array.isArray(res.data)) {
      return res.data;
    } else {
      return [];
    }
            }
        }
     )

     const handleOpenModalRef=(a)=>
     {
        setAssets(a);
        modalref.current.showModal();
     }
     const handleRequestSubmit=(e)=>
     {
        e.preventDefault();
        const notes=e.target.notes.value;
        
        const requestData={
            assetId:assets._id,
            assetName:assets.productname,
            assetType:assets.productType,
            requesterName:userInfo?.name,
            requesterEmail:userInfo?.email,
            hrEmail:assets.hrEmail,
            companyName:assets.companyName,
            requestDate:new Date(),
            requestStatus:"Pending",
            notes:notes
        }
        axiosSecure.post('/requestAsset',requestData)
        .then((res)=>
        {
            if(res.data.insertedId)
            {
                alert("Asset Request Submitted Successfully")
                modalref.current.close();
                refetch();
            }
        })
     }

  return (
    <div>
        <h2 className="text-3xl font-bold text-center mb-6 text-black  ">All Assets:{asset.length}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
               
               {
               asset.length === 0 && !isLoading && (
    <div>
      <span className="text-center text-gray-500">
        No assets found
      </span>
    </div>
  )}
  {
    asset .filter(a => a.availableQuantity > 0).map((a)=>
      <div key={a._id} className="border p-4 rounded-lg shadow-lg bg-white">
        <img src={a.productImage} alt={a.productname} className='w-[80%] lg:w-[60%] h-60 mx-auto rounded-2xl my-4' />
        <h3 className="text-2xl font-bold mb-2 text-black">{a.productname}</h3>
        <p className="text-gray-700 mb-1"><span className="font-semibold text-black">Type:</span> {a.productType}</p>
        <p className="text-gray-700 mb-1"><span className="font-semibold text-black">Quantity:</span> {a.quantity}</p>
        <p className="text-gray-700 mb-1"><span className="font-semibold text-black">Available:</span> {a.availableQuantity}</p>
        <p className="text-gray-700 mb-1"><span className="font-semibold text-black">Company:</span> {a.companyName}</p>
        <p className="text-gray-700 mb-1"><span className="font-semibold text-black">Date Added:</span> {new Date(a.dateAdded).toLocaleDateString()}</p>
        <button className="mt-4 btn w-full btn-primary  text-white rounded-2xl " onClick={()=>handleOpenModalRef(a)}>Request Asset</button>
      </div>
    )

  }
 </div>

<dialog ref={modalref} className="modal">
  <div className="modal-box w-11/12 max-w-5xl bg-white">
    <h3 className="font-bold text-lg text-center text-black ">Notes</h3>
    <form onSubmit={handleRequestSubmit}>
    <label className="text-black font-semibold">Please provide specific needs for the asset you are requesting:</label>
  <textarea name="notes" className="textarea textarea-bordered w-full  mt-4 mb-4"></textarea>
  <button className="btn btn-primary w-full text-white rounded-2xl ">Submit Request</button>
  </form>
    <div className="modal-action">
      <form method="dialog">
       
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>



    </div>
  );
};

export default RequestAsset;