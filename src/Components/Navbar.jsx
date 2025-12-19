import React, { use, useEffect, useState } from 'react';
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
const Navbar = () => {
  const navigate=useNavigate();
  const {user,logoutUser}=use(AuthContext)
  const axiosSecure=useAxiosSecure();
  const[userInfo,setUserInfo]=useState();
  const handleLogOut=()=>
    {
      logoutUser()
      .then(()=>
      {
       toast.success("Logged Out Successfully");
        navigate("/auth/login")
      })
    }  
    
      useEffect(()=>
      {
        if(user)
        {
          axiosSecure.get(`/user?email=${user.email}`)
          .then((res)=>
          {
         
            setUserInfo(res.data)
            

          })
        }

      },[user,axiosSecure,setUserInfo])


    

    const link=<div className='flex flex-col lg:flex-row gap-2 lg:gap-6 font-bold text-lg '>

    <Link to="/">Home</Link>
        
        {
          user ? <Link to="/dashboard">Dashboard</Link> :<>
          <Link to="/auth/register-hr">Join As HR</Link>
        <Link to="/auth/register-employee">Join as Employee</Link></>

        }
     

    </div>
    const adminLinks=<div className='bg-white flex flex-col'>
    <Link to="/dashboard" className='btn bg-white text-black p-2 '>Asset List</Link>
    <Link to="/dashboard/add-asset" className='btn bg-white text-black p-2'>Add Asset</Link>
    <Link to="/dashboard/request-asset-list" className='btn bg-white text-black p-2'>All Request</Link>
    <Link to="/dashboard/my-employees" className='btn bg-white text-black p-2'>Employee List</Link>
    <Link to="/dashboard/profile" className='btn bg-white text-black p-2'> My Profile</Link>
    <button onClick={handleLogOut} className='btn bg-white text-black p-2'>Log Out</button>
    </div>

        const employeeLinks=<div className='bg-white flex flex-col'>
    <Link to="/dashboard/my-assets" className='btn bg-white text-black p-2 '> My Assets </Link>
    <Link to="/dashboard/my-team" className='btn bg-white text-black p-2'>My Team</Link>
    <Link to="/dashboard/request-asset" className='btn bg-white text-black p-2'>Request Asset</Link>
    <Link to="/dashboard/profile" className='btn bg-white text-black p-2'> My Profile</Link>
    <button onClick={handleLogOut} className='btn bg-white text-black p-2'>Log Out</button>
    </div>
  return (
   <div className="navbar bg-gray-200 text-black shadow-sm py-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div> 
      <ul
        tabIndex="-1"
        className="menu bg-white menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
            {link}
        
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><img src={logo} alt="AssestVerse Logo" className='w-44' /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {link}
    </ul>
  </div>
  <div className="navbar-end flex gap-2 lg:mx-4 ">
    {
      user ?     <div className="dropdown dropdown-start  relative">
      <div tabIndex={0} role="button" className="btn btn-ghost  ">
      <img src={userInfo?.profileImage} className='rounded-full w-15 h-15'></img>
      </div> 
      <ul
        tabIndex="-1"
        className="menu bg-white menu-sm dropdown-content rounded-box z-1 mt-3 w-48 p-2 shadow right-0 left-auto">
           
        {
          userInfo?.role==="HR" ? adminLinks : employeeLinks
        }
      </ul>
    </div> :
       <Link to="/auth/login" className="btn btn-accent font-bold text-xl">Login</Link>
    }
   

  </div>
</div>
  );
};

export default Navbar;