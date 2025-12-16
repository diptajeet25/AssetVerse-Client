import React, { use } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const GoogleSignIn = () => {
    const {googleSignIn}=use(AuthContext)
    const axiosSecure=useAxiosSecure();
    const navigate=useNavigate();

    const handleGoogleSignIn=()=>
    {
  googleSignIn()
   .then((res)=>
   {
console.log(res)

const userInfo={
    name:res.user.displayName,
    email:res.user.email,
    profileImage:res.user.photoURL

}
axiosSecure.post("/users",userInfo)
.then((result)=>
{
    console.log(result)
    toast.success("Login Successful");
    navigate("/")

})

   }
)
    }
  return (

         <button type="button"  onClick={handleGoogleSignIn}  className="btn  border-1-black text-black w-full btn-warning my-4 mb-3 border-[#e5e5e5]"> <FaGoogle />Login with Google
</button>
  
  );
};

export default GoogleSignIn;