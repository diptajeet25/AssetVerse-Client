import React from 'react';
import logo from "../assets/logo.png"
import { Link } from 'react-router';
const Navbar = () => {

    const link=<div className='flex flex-col lg:flex-row gap-2 lg:gap-6 font-bold text-lg '>

    <Link to="/">Home</Link>
        <Link>Parent</Link>
       <Link>About</Link>

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
    <Link to="/auth" className="btn btn-accent font-bold text-xl">Join</Link>

  </div>
</div>
  );
};

export default Navbar;