import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user,loading}=use(AuthContext);

    if(loading){


        return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-lg font-semibold text-base-content opacity-70 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
    }
    if(!user)
    {
            toast.warning("You must be logged in to access this page.");
    }
    if(user)
    {
        return children;
    }
  

        return <Navigate state={location.pathname}  to="/auth/login"></Navigate>
    


};

export default PrivateRoute;