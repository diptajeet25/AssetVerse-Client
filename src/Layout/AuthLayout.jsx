import React from 'react';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  );
};

export default AuthLayout;