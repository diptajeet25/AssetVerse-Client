import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading}=use(AuthContext);

    if(loading){
        return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
    }
    if(user)
    {
        return children;
    }
    else{
      toast.warning("You must be logged in to access this page.");
        return <Navigate state={location.pathname}  to="/auth/login"></Navigate>
    }


};

export default PrivateRoute;