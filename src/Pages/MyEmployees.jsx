import React, { use } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';

const MyEmployees = () => {

    const axiosSecure=useAxiosSecure();
    const {user,loading}=use(AuthContext);
    const {data:employees=[],refetch,isLoading}=useQuery(
        {
            queryKey:['my-employees',user?.email],
            enabled:!!user?.email && !loading,
            queryFn:async()=>{
              const res= await axiosSecure.get(`/employees?hrEmail=${user.email}`);
                return res.data;

            }
        }
        
    )
const {data:assets=[]}=useQuery(
    {
        queryKey:['my-assets'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`assetscount?hrEmail=${user.email}`);
            return res.data;
        }

    }
)


const handleDelete=(emp)=>
{
    console.log(emp);

    axiosSecure.patch("/deleteEmployee",emp)
    .then((res)=>
    {
        console.log(res);
      if(res.data.employeeUpdate.modifiedCount>0 && res.data.userUpdate.modifiedCount>0)
        {
            alert("Employee Deleted Successfully");
            refetch();
            
        }
    })
    .catch((err)=>
    {
        console.log(err);

    })

}

    if(loading || isLoading)
        return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-blue-600"></span>
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
    )
  return (
    <div>
        <h2 className="text-3xl font-bold text-center mb-6 text-black  ">My Employees: {employees.length}</h2>
        <div className="overflow-x-auto">
  <table className="table  w-full text-black text-xl mx-8 mt-8">
    {/* head */}
    <thead className='text-black text-2xl'>
        <tr className='text-center'>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Join Date</th>
        <th>Asset Count</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody className='text-black'>
        {employees.length === 0 && !isLoading && (
    <tr>
      <td colSpan="6" className="text-center text-gray-500">
        No employees found
        </td>
    </tr>
    )}

        {
            employees.map((emp,index)=><tr key={emp._id} className='text-center'>
                <th>{index+1}</th>
                <td>{emp.employeeName}</td>
                <td>{emp.employeeEmail}</td>
                <td>{new Date(emp.affiliationDate).toLocaleDateString()}</td>
                <td>{assets.filter(a=>a.employeeEmail===emp.employeeEmail).length}</td>
                <td><button className='btn btn-warning' onClick={()=>handleDelete(emp)}>Delete</button></td>
            </tr>)
        }
    </tbody>
  </table>
</div>
     </div>
  );
};

export default MyEmployees;