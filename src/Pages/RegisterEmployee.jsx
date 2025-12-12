
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const RegisterEmployee = () => {
  const {createUser}=use(AuthContext);
  const axiosSecure=useAxiosSecure();

   const {register,handleSubmit,formState:{ errors } }=useForm();

   const handleRegisterEmployee=(data)=>
   {
    console.log(data);
    const email=data.email
    const password=data.password
    createUser(email,password)
    .then(()=>
    {
      const userInfo={
        name:data.name,
        profileImage:data.profileImage,
        email:email,
        role:"employee",
        dateOfBirth:data.dateOfBirth,
      }
      axiosSecure.post('/users',userInfo)
      .then((result)=>
      {

        console.log(result);
        alert("EMPLoyee Resister SUcceessfully")
      })

    })


   }


  return (
    <div className="w-full lg:w-[50%] bg-gray-100  mx-auto my-16 rounded-3xl p-8 ">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Join As Employment</h2>
        <form onSubmit={handleSubmit(handleRegisterEmployee)} className="space-y-5 mb-2">

            
<div>
     <label className="font-semibold text-black">Full Name</label>
          <input
            type="text"
            {...register("name",{required:true})}
            placeholder="Enter your full name"
            className="input input-bordered w-full"
          />
           {errors.name?.type==="required" && <p className='text-red-600'>Name is required</p>}
</div>
<div>
     <label className="font-semibold text-black">Profile Image</label>
          <input type="url" 
          {...register("profileImage",{required:true})}
          placeholder='Enter Your Profile Image URL'
          
          className="input input-bordered w-full" />
           {errors.profileImage?.type==="required" && <p className='text-red-600'>Profile image's URL is required</p>}

          
</div>
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
<div>
     <label className="font-semibold text-black">Date of Birth</label>
          <input
            type="date"
             {...register("dateOfBirth",{required:true})}
            placeholder="Enter your Email"
            className="input input-bordered w-full"
           
          />
          {errors.dateOfBirth?.type==="required" && <p className='text-red-600'>Date Of Birth is required</p> }
</div>
<button type="submit" className="btn btn-primary text-black  w-full text-lg mt-4">
          Register
        </button>

        </form>

        <p className=' mt-4 font-bold text-blue-600 text-center text-lg w-full'><Link to="/auth/register-hr" >Register as HR</Link></p>
        
                 <p className="text-center mt-2 text-gray-600">
                Already have an account?{" "}
                <Link to="/auth/login"  className="text-blue-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>

    
    </div>
  );
};

export default RegisterEmployee;