import React from 'react';
import { Link } from 'react-router';

const RegisterHR = () => {
  return (
    <div className="w-full lg:w-[50%] mx-auto my-16 bg-gray-100 rounded-3xl p-8 ">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Join As HR</h2>
        <form className="space-y-5">

            
<div>
     <label className="font-semibold text-black">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
           
          />
          
</div>

<div>
     <label className="font-semibold text-black">Company Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
           
          />
          
</div>

<div>
     <label className="font-semibold text-black">Company Logo</label>
          <input type="file" className="file-input file-input-neutral w-full" />
          
</div>


<div>
     <label className="font-semibold text-black">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="input input-bordered w-full"
           
          />
</div>
<div>
     <label className="font-semibold text-black">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            className="input input-bordered w-full"
           
          />
</div>
<div>
     <label className="font-semibold text-black">Date of Birth</label>
          <input
            type="date"
            placeholder="Enter your Email"
            className="input input-bordered w-full"
           
          />
</div>


        </form>
        <p className=' mt-4 font-bold text-blue-600 text-center text-lg w-full'><Link to="/auth/register-employee" >Register as Employee</Link></p>

         <p className="text-center mt-2 text-gray-600">
        Already have an account?{" "}
        <Link to="/auth/login"  className="text-blue-600 font-semibold hover:underline">
          Login
        </Link>
      </p>

    </div>
  );
};

export default RegisterHR;