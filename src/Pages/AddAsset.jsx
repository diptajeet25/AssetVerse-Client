import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AddAsset = () => {
    const {user,loading}=use(AuthContext)
    const axiosSecure=useAxiosSecure();
    const[userInfo,setUserInfo]=useState({});
    

    useEffect(()=>
    {
        axiosSecure.get(`user?email=${user.email}`)
        .then((res)=>
        {
            setUserInfo(res.data)

        })


    },[user,axiosSecure])
   


       const {register,handleSubmit,setValue,formState:{ errors } }=useForm();

  useEffect(() => {

        if (userInfo) {
    setValue("hrEmail", userInfo.email);
   
    setValue("companyName", userInfo?.companyName);
  }
}, [userInfo, setValue]);

const handleAddAsset=(data)=>
{
   
     data.quantity = Number(data.quantity);
  data.availableQuantity = Number(data.quantity);
    data.dateAdded=new Date();
    axiosSecure.post('/asset',data)
    .then((res)=>
    {
        if(res.data.insertedId)
        {
            toast.success("Asset Successfully Added");

        }
    })
    .catch(() => {

      toast.error('Failed to add asset. Please try again.');
    });


}
if(loading)
  return (

    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-lg font-semibold text-base-content opacity-70 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>  );


  return (
   <div className="w-full lg:w-[50%] bg-base-200  mx-auto my-16 rounded-3xl p-8 ">
        <h2 className="text-3xl font-bold text-center mb-6 text-base-content">Add Asset</h2>
        <form onSubmit={handleSubmit(handleAddAsset)}  className="space-y-5 mb-2">
            <div>
     <label className="font-semibold text-base-content">Product Name</label>
          <input
            type="text"
            {...register("productname",{required:true})}
            placeholder="Enter Product name"
            className="input input-bordered w-full"
          />
           {errors.productname?.type==="required" && <p className='text-red-600'>Name is required</p>}
</div>
          <div>
     <label className="font-semibold text-base-content">Product Image</label>
          <input
            type="url"
            {...register("productImage",{required:true})}
            placeholder="Enter Product Image"
            className="input input-bordered w-full"
          />
           {errors.productImage?.type==="required" && <p className='text-red-600'>Image Link is required</p>}
</div>
<div>
  <label className="font-semibold text-base-content">Product Type</label>

  <select
    {...register("productType", { required: true })}
    className="select select-bordered w-full"
    defaultValue=""
  >
    <option value="" disabled>
      Select product type
    </option>
    <option value="returnable">Returnable</option>
    <option value="non-returnable">Non-Returnable</option>
  </select>

  {errors.productType?.type === "required" && (
    <p className="text-red-600">Product type is required</p>
  )}
</div>
<div>
  <label className="font-semibold text-base-content">Product Quantity</label>

  <input
    type="number"
    {...register("quantity", {
      required: true,
      min: 1
    })}
    placeholder="Enter quantity"
    className="input input-bordered w-full"
  />

  {errors.quantity?.type === "required" && (
    <p className="text-red-600">Quantity is required</p>
  )}

  {errors.quantity?.type === "min" && (
    <p className="text-red-600">Quantity must be at least 1</p>
  )}
</div>
<div>
  <label className="font-semibold text-base-content">HR Email</label>

  <input
    type="email"
    {...register("hrEmail", {
      required: true,
    })}
    placeholder="Enter HR Email"
    className="input input-bordered w-full"
    defaultValue={userInfo.email}
    readOnly
  />

  {errors.hrEmail?.type === "required" && (
    <p className="text-red-600">HR Email required</p>
  )}

</div>

<div>
  <label className="font-semibold text-base-content">Company Name</label>

  <input
    type="text"
    {...register("companyName", {
      required: true,
    })}
    placeholder="Enter Company Name"
    className="input input-bordered w-full"
    
    readOnly
  />

  {errors.companyName?.type === "required" && (
    <p className="text-red-600">Company Name is required</p>
  )}

</div>
<button type="submit" className="btn btn-primary w-full text-lg mt-4">
       Add Asset
        </button>
        </form>
            
    </div>

  );
};

export default AddAsset;