import React, { use, useRef, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';



const MyEmployees = () => {

  const queryClient = useQueryClient();


    const axiosSecure=useAxiosSecure();
    const modalRef=useRef();
    const {user,loading}=use(AuthContext);
    const [selectedEmployee,setSelectedEmployee]=useState(null);
    const {data:employees=[],refetch,isLoading}=useQuery(
        {
            queryKey:['my-employees',user?.email],
            enabled:!!user?.email && !loading,
            queryFn:async()=>{
              const res= await axiosSecure.get(`/employees?hrEmail=${user.email}`);
              return Array.isArray(res.data) ? res.data : [];
            }
        }
        
    )
const {data:assets=[]}=useQuery(
    {
        queryKey:['my-assets'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`assetscount?hrEmail=${user.email}`);

            return Array.isArray(res.data) ? res.data : [];
        }

    }
)


const {data:availableAssets=[]}=useQuery(
  {
      queryKey:['my-assets-to-assign',user?.email],
      enabled: !!user?.email,
      queryFn:async()=>{
        const res=await axiosSecure.get(`myassetsToassigninModal?hrEmail=${user.email}`);
          return Array.isArray(res.data) ? res.data : [];
      }
  }
)

const handleModalOpen=(emp)=>
{
  setSelectedEmployee(emp);
    modalRef.current.showModal();
}


const handleDelete=(emp)=>
{
  

    axiosSecure.patch("/deleteEmployee",emp)
    .then((res)=>
    {
       
      if(res.data.employeeUpdate.modifiedCount>0 && res.data.userUpdate.modifiedCount>0)
        {
           toast.success("Employee Deleted Successfully");
            refetch();
            
        }
    })
    .catch((err)=>
    {
        console.log(err);
        toast.error("Failed to delete employee. Please try again.");

    })

}
const handleFinalAssign=(asset)=>
{
  
    const assignInfo={
      assetId:asset._id,
      assetName:asset.productname,
      assetImage:asset.productImage,
      assetType:asset.productType,
      employeeEmail:selectedEmployee.employeeEmail,
      employeeName:selectedEmployee.employeeName,
      hrEmail:user.email,
      companyName:asset.companyName,
     assignmentDate:new Date(),
      status:"assigned"

    }

axiosSecure.post("/assignAssetByHR",assignInfo)
.then((res)=>
{
    
if(res.data.assignedAsset.insertedId  && res.data.updatedAsset.modifiedCount>0)
{
   toast.success("Asset Assigned Successfully");
 
    modalRef.current.close();
    refetch();
    queryClient.invalidateQueries(['my-assets']);     
  queryClient.invalidateQueries(['my-assets-to-assign', user.email]);
}
})
.catch(()=>
{

    toast.error("Failed to assign asset. Please try again.");

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
                <td className='flex justify-center items-center gap-2'>
                  <button className='btn btn-primary' onClick={()=>handleModalOpen(emp)}>Assign Asset</button>
                  <button className='btn btn-warning' onClick={()=>handleDelete(emp)}>Delete</button></td>
            </tr>)
        }
    </tbody>
  </table>
</div>

<dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box bg-white text-black">
    <h3 className="font-bold text-lg">Assign Asset</h3>
    <div className="py-4">
      <table className="table w-full text-black">
        <thead>
          <tr className='text-center text-black'>
            <th>#</th>
            <th>Asset Name</th>
            <th>Asset Type</th>
            <th>Available Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availableAssets.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500">
                No available assets to assign
              </td>
            </tr>
          )}

          {availableAssets.map((asset, index) => (
            asset.availableQuantity > 0 && (
            
            <tr key={asset._id} className='text-center'>
              <th>{index + 1}</th>
              <td>{asset.productname}</td>
              <td>{asset.productType}</td>
              <td>{asset.availableQuantity}</td>
              <td><button className="btn btn-primary" onClick={()=>handleFinalAssign(asset)}>Assign</button></td>
            </tr>)
          ))}
          
          </tbody>
      </table>
      </div>
    
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>



     </div>
  );
};

export default MyEmployees;