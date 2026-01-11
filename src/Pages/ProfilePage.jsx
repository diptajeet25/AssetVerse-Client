import React, { use, useRef } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "react-toastify";

const ProfilePage = () => {

    const {user,loading}=use(AuthContext)
    const modalref=useRef();
    const axiosSecure=useAxiosSecure();
        const { register, handleSubmit,setValue, formState: { errors }} =useForm();
     
    
   
    const { data: profile={},refetch,isLoading}=useQuery({
    queryKey: ['assets',user?.email],
    queryFn: async()=>
    {
        const res=await axiosSecure.get(`/user?email=${user.email}`)
         return res.data;
        
    }
  });
 

    const handleModalOpen=()=>
    {
        modalref.current.showModal();
        setValue("name",profile.name);
        setValue("profileImage",profile.profileImage);
        setValue("dateOfBirth",profile.dateOfBirth);

    }
   const handleUpdateProfile=(data)=>
  {
   
    data.updatedAt=new Date();
   
    
    axiosSecure.patch(`/user/${profile._id}`,data)
    .then((res)=>
    {
        if(res.data.modifiedCount>0)
        {
            toast.success("Profile Updated Successfully");
            modalref.current.close();
            refetch();
        }
  })
    .catch(()=>
    {
        toast.error("Failed to update profile. Please try again.");

    })
  ;
}

if(loading || isLoading)
  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-lg font-semibold text-base-content opacity-70 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="bg-base-100 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
    
        <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-6 flex flex-col items-center">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
          />
          <h2 className="text-2xl font-bold text-white mt-4">{profile.name}</h2>
          <p className="text-indigo-100 capitalize">
            {profile.role === "HR" ? "HR Manager" : "Employee"}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-base-content opacity-70">Email</p>
            <p className="font-medium text-base-content">{profile.email}</p>
          </div>

          <div>
            <p className="text-sm text-base-content opacity-70">Date of Birth</p>
            <p className="font-medium text-base-content">
             {new Date (profile.dateOfBirth).toDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-base-content opacity-70">Joined On</p>
            <p className="font-medium text-base-content">
              {new Date(profile.createdAt).toDateString()}
            </p>
          </div>
        </div>

    
        <div className="px-6 pb-6 flex flex-col gap-4 justify-center items-center">
          {profile.role === "HR" ? (
            <Link to="/dashboard" className="w-full btn bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition">
              Go to HR Dashboard
            </Link>
          ) : (
            <Link to="/dashboard" className="w-full btn bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-semibold transition">
             GO to Employee Dashboard
            </Link>
          )}
          <button className="btn w-full btn-outline py-2 rounded-xl font-semibold transition" onClick={handleModalOpen}>Edit Profile</button>
            
          
        </div>
      </div>

  <dialog id="my_modal_4" ref={modalref} className="modal">
  <div className="modal-box w-11/12 max-w-5xl bg-base-100">
   
<h3 className="font-bold text-2xl text-center text-base-content">Edit Your Information!</h3>
     <form onSubmit={handleSubmit(handleUpdateProfile)}  className="space-y-5 mb-2">
            <div>
     <label className="font-semibold text-base-content">Your Name</label>
          <input
            type="text"
            {...register("name",{required:true})}
            placeholder="Enter Your name"
            className="input input-bordered w-full"
           
          />
           {errors.name?.type==="required" && <p className='text-red-600'>Name is required</p>}
</div>
          <div>
     <label className="font-semibold text-base-content">Profile Image</label>
          <input
            type="url"
            {...register("profileImage",{required:true})}
            placeholder="Enter Profile Image"
            className="input input-bordered w-full"
           
          />
           {errors.profileImage?.type==="required" && <p className='text-red-600'>Image Link is required</p>}
</div>
<div>
  <label className="font-semibold text-base-content">Date of Birth</label>

  <input
    type="date"
    {...register("dateOfBirth")}
    placeholder="Enter Date of Birth"
    className="input input-bordered w-full"
   
  />
  {
    errors.dateOfBirth?.type === "required" && (
      <p className="text-red-600">Date of Birth is required</p>
    )
  }


</div>


<button type="submit" className="btn btn-primary w-full text-lg mt-4">
      Edit Profile
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

export default ProfilePage;