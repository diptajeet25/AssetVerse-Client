import React from 'react';
import error from "../assets/error-404.png"
import { NavLink } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


const ErrorPage = () => {
    return (
        <div>
            <title>Error 404 - Page Not Found</title>
            <Navbar></Navbar>
            <img src={error} alt="" className='w-[25%] my-8 mx-auto'/>
            <div className=' flex justify-center'>
            <NavLink to="/" className="btn btn-primary w-36 my-2 mb-6">Back To Home</NavLink>
            </div>
  <Footer></Footer>
            
        </div>
    );
};

export default ErrorPage;