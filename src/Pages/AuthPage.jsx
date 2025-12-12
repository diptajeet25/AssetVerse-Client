import { BriefcaseBusiness, LogIn, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const AuthPage = () => {
  return (
    <div className='flex flex-col my-12 gap-8 items-center justify-center min-h-190'>
       <div className='text-center text-black mb-6 max-w-2xl '>
  <h2 className='text-4xl font-bold mb-3'>
    Get Started with Your Professional Journey
  </h2>

  <p className='text-gray-600 text-lg leading-relaxed'>
    Whether you’re joining as an HR manager to build and manage your workforce, 
    or registering as an employee to access your workspace — choose the option 
    that fits your role and begin your experience with us.
  </p>
</div>
        <Link to="/auth/register-hr" className='btn btn-accent py-8 text-2xl  lg:text-3xl  font-bold w-80 lg:w-125 rounded-2xl'><BriefcaseBusiness /> Join As an HR</Link>
        <Link to="/auth/register-employee" className='btn btn-primary py-8 text-2xl  lg:text-3xl  font-bold w-80 lg:w-125 rounded-2xl'><User /> Join As An Employee</Link>
        <Link to="/auth/login" className='btn btn-warning text-2xl py-8  lg:text-3xl text-black  font-bold w-80 lg:w-125 rounded-2xl'><LogIn /> Log In</Link>
    </div>
  );
};

export default AuthPage;