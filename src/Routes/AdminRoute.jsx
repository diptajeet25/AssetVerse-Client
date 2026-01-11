import React, { use } from 'react';

import { AuthContext } from '../Contexts/AuthContext';
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';

const AdminRoute = ({children}) => {
    const {role,isLoading}=useRole();
    const {loading}=use(AuthContext);
    if(loading || isLoading)
              return (
     (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-lg font-semibold text-base-content opacity-70 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  ))

    if(role!=="HR")
    {
      toast.error("Access denied. Admins only.");
        return <Navigate to="/"></Navigate>
    }
    return children
    

 
};

export default AdminRoute;