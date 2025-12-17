import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import GoogleSignIn from '../Components/GoogleSignIn';
import { toast } from 'react-toastify';

const Login = () => {
  const {register,handleSubmit,formState:{ errors } }=useForm();
  const {loginUser}=use(AuthContext);
  const navigate=useNavigate();
  const location=useLocation()
  console.log(location);
  const handleLLogin=(data)=>
  {
    console.log(data);
    const email=data.email
    const password=data.password
    loginUser(email,password)
    .then(()=>
    {
    toast.success("Login Successful");
  if(location.state)
  {
    navigate(location.state);
  }
  else{
    navigate("/");
  }

    })
    .catch((e)=>
    {
    toast.error(e.message);
    })
  }
  
  return (
     <div className="w-full lg:w-[40%] bg-gray-100  mx-auto my-24 md:my-80 lg:my-24 rounded-3xl p-8 ">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login </h2>

<form onSubmit={handleSubmit(handleLLogin)} className="space-y-5">

  <div>
     <label className="font-semibold text-black">Email</label>
          <input
            type="email"
             {...register("email",{required:true})}
            placeholder="Enter your Email"
            className="input input-bordered w-full"
           
          />
             {errors.email?.type==="required" && <p className='text-red-600'>Email is required</p>}
</div>
<div>
     <label className="font-semibold text-black">Password</label>
          <input
            type="password"
            {...register("password",{required:true,minLength:6,maxLength:12,pattern:/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/,})}
            placeholder="Enter your Password"
            className="input input-bordered w-full"
           
          />
           {errors.password?.type==="required" && <p className='text-red-600'>Password is required</p>}
          {errors.password?.type==="minLength" && <p className='text-red-600'>Password must be at least 6 characters</p>}
          {errors.password?.type==="maxLength" && <p className='text-red-600'>Password must be less than 12 characters</p>}
          {errors.password?.type==="pattern" && <p className='text-red-600'>Password must have one uppercase, one number and one special character</p>}
</div>

<button type="submit" className="btn btn-primary text-black  w-full text-lg mt-4">
          Login
        </button>


</form>
<GoogleSignIn></GoogleSignIn>
   <p className="text-center mt-3 text-lg text-gray-600">
                Don't have an account?{" "}
                <Link to="/auth/register-hr"  className="text-blue-600 font-semibold hover:underline">
                  Register As an HR
                </Link>/<Link to="/auth/register-employee"  className="text-blue-600 font-semibold hover:underline">
                  Register As an Employee
                </Link>
              </p>


    </div>
  );
};

export default Login;