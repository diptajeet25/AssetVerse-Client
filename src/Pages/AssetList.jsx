import React, { use, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const AssetList = () => {
    const {user,loading}=use(AuthContext);
   

    const axiosSecure=useAxiosSecure();
    const modalref=useRef();
    const [assets,setAssets]=useState({})
    const { register, handleSubmit,setValue, formState: { errors }} =useForm();
  

const {
  data,
  refetch,
  isLoading
} = useQuery({
  queryKey: ['assets', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/assets?hrEmail=${user.email}`
    );
    if (Array.isArray(res.data)) {
      return res.data;
    } else {
      return [];
    }
  }
});


const asset = Array.isArray(data) ? data : [];

 
const handleEdit = (data) => {
  setAssets(data);

  setValue("productImage", data.productImage);
  setValue("productname", data.productname);
  setValue("productType", data.productType);
  setValue("quantity", data.quantity);
    setValue("hrEmail", data.hrEmail);
    setValue("companyName", data.companyName);

  modalref.current.showModal();
};

  const handleUpdateAsset=(data)=>
  {
    console.log(data);
    const availableQuantity=data.quantity - (assets.quantity - assets.availableQuantity);
    data.availableQuantity=availableQuantity;
    axiosSecure.patch(`/asset/${assets._id}`,data)
    .then((res)=>
    {
        if(res.data.modifiedCount>0)
        {
            alert("Asset Updated Successfully")
            modalref.current.close();
            refetch();
        }
    })

  }

  const handleDeleteAsset=(id)=>
  {
    Swal.fire({
  title: "Are you sure?",
  text: "This asset will be deleted permanently!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.delete(`/asset/${id}`)
    .then((res)=>
    {
        if(res.data.deletedCount>0)
        {
            refetch();
            Swal.fire({
      title: "Deleted!",
      text: "Your asset has been deleted.",
      icon: "success"
    });
        }
    })
    
  }
});
  }

  if(loading)
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
    <div className='text-black min-h-200'>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Company's Assets: {asset.length}</h2>


        <div className="overflow-x-auto">
  <table className="table ">
  
    <thead>
      <tr className='text-black font-bold text-2xl text-center'>
        <th>#</th>
        <th>Product Name</th>
        <th>Product Type</th>
        <th>Quantity</th>
        <th>Available</th>
        <th>Date Added</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
{asset.length === 0 && !isLoading && (
    <tr>
      <td colSpan="7" className="text-center text-gray-500">
        No assets found
      </td>
    </tr>
  )}

 {asset.map((a,i)=>

      <tr className='text-2xl text-center'>
        <th>{i+1}</th>
       <td>
  <div className="flex items-center justify-center gap-3">
    <img
      src={a.productImage}
      alt={a.productname}
      className="w-16 h-16 object-cover rounded"
    />
    <span className="font-medium">{a.productname}</span>
  </div>
</td>

        <td>{a.productType}</td>
        <td>{a.quantity}</td>
        <td>{a.availableQuantity}</td>
        <td>{new Date(a.dateAdded).toLocaleDateString()}</td>
        <td className='flex gap-2 justify-center items-center'>
            <button className='btn btn-primary' onClick={()=>handleEdit(a)}>Edit</button>
            <button className='btn btn-warning' onClick={()=>handleDeleteAsset(a._id)}>Delete</button>
        </td>
      </tr>

) }
    
   
    
    </tbody>
  </table>
</div>

<dialog  ref={modalref} className="modal">
  <div className="modal-box w-11/12 max-w-5xl bg-white ">
    <h3 className="font-bold text-2xl text-center">Edit Product Information!</h3>
     <form onSubmit={handleSubmit(handleUpdateAsset)}  className="space-y-5 mb-2">
            <div>
     <label className="font-semibold text-black">Product Name</label>
          <input
            type="text"
            {...register("productname",{required:true})}
            placeholder="Enter Product name"
            className="input input-bordered w-full text-white"
           
          />
           {errors.productname?.type==="required" && <p className='text-red-600'>Name is required</p>}
</div>
          <div>
     <label className="font-semibold text-black">Product Image</label>
          <input
            type="url"
            {...register("productImage",{required:true})}
            placeholder="Enter Product Image"
            className="input input-bordered w-full text-white"
           
          />
           {errors.productImage?.type==="required" && <p className='text-red-600'>Image Link is required</p>}
</div>
<div>
  <label className="font-semibold text-black">Product Type</label>

  <select
    {...register("productType", { required: true })}
    className="select select-bordered w-full text-white"
 

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
  <label className="font-semibold text-black">Product Quantity</label>

  <input
    type="number"
    {...register("quantity", {
      required: true,
      min: 1
    })}
    placeholder="Enter quantity"
    className="input input-bordered w-full text-white"
   
  />

  {errors.quantity?.type === "required" && (
    <p className="text-red-600">Quantity is required</p>
  )}

  {errors.quantity?.type === "min" && (
    <p className="text-red-600">Quantity must be at least 1</p>
  )}
</div>
<div>
  <label className="font-semibold text-black">HR Email</label>

  <input
    type="email"
    {...register("hrEmail")}
    placeholder="Enter HR Email"
    className="input input-bordered w-full text-white"
    readOnly
  />


</div>

<div>
  <label className="font-semibold text-black">Company Name</label>

  <input
    type="text"
    {...register("companyName")}
    placeholder="Enter Company Name"
    className="input input-bordered w-full text-white"
    readOnly
  />


</div>
<button type="submit" className="btn btn-primary text-black  w-full text-lg mt-4">
       Add Asset
        </button>
        </form>


    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

    </div>
  );
};

export default AssetList;