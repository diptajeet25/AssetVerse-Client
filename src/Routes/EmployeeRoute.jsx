import React, { use } from 'react';

import { AuthContext } from '../Contexts/AuthContext';
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';

const EmployeeRoute = ({children}) => {

     const {role,isLoading}=useRole();
    const {loading}=use(AuthContext);
if(loading || isLoading)
              return (
     (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  ))
  if(role!=="employee")
  {
       toast.error("Access denied. Employees only.");
        return <Navigate to="/"></Navigate>
  }
  return children;
};

export default EmployeeRoute;