import React, { use, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyTeam = () => {
    const axiosSecure=useAxiosSecure();
    const {user,loading}=use(AuthContext);
    const [myTeam,setMyTeam]=useState([]);
    const [currentMonthMembers,setCurrentMonthMembers]=useState([]);


   

    const {data:team=[],isLoading}=useQuery(
        {
            queryKey:['my-team',user?.email],
            enabled:!!user?.email && !loading,
            queryFn:async()=>{
                const res=await axiosSecure.get(`myCompanies?employeeEmail=${user.email}`);
                

                return res.data;
            }

        })


        const companyName=team.map(t=>t.companyName);
        console.log(companyName);

        const handleFind=(e)=>
        {
            e.preventDefault();
            const selectedCompany=e.target.company.value;
           
           axiosSecure.get(`teamMembers?employeeEmail=${user.email}&companyName=${selectedCompany}`)
            .then((res)=>
            {
                console.log(res.data);
                setMyTeam(res.data);
            });
}

const handleSendWish = (emp) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `Birthday wish sent to ${emp.name} 🎉`,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });
};





useEffect(()=>
{
    setCurrentMonthMembers([]);
    myTeam.forEach((member)=>
    {
    axiosSecure.get(`/birthDay?email=${member.employeeEmail}`)
    .then((res)=>
    {
        console.log(res.data);
        const member=res.data;
        const birthDate=new Date(res.data.dateOfBirth);
        console.log(birthDate);
        const month=birthDate.getMonth()+1;
        if(month===new Date().getMonth()+1)
        {
         setCurrentMonthMembers(prev=>[...prev,member]);   
        }
    })
    });


},[myTeam,axiosSecure]);

console.log(currentMonthMembers[0]);


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
    );


  return (
    <div>
        <h2 className="text-3xl font-bold text-center mb-6 text-black  ">My Team</h2>
        <form onSubmit={handleFind} className='flex  items-center justify-center'>
            <select name="company" className="select select-bordered w-full max-w-xs"  >
                <option value="">Select Company</option>
                {
                    
                    companyName.map((name,index)=>(
                        <option key={index} value={name}>{name}</option>
                    ))
                    
                }
            </select>
            <button type='submit' className="btn bg-black"><FaSearch></FaSearch></button>
            

            </form> 
            <div className="overflow-x-auto mt-8">
    <table className="table text-black text-xl w-full mx-4 mt-8">
        <thead className='text-black text-2xl'>
            <tr className='text-black text-2xl text-center'>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company Name</th>
            </tr>
        </thead>
        <tbody>
            {
                myTeam.length === 0 && !isLoading && (
                    <tr>
                        <td colSpan="4" className="text-center text-gray-500">
                            No team members found
                        </td>
                    </tr>
                )
            }
            {
                myTeam.map((member,index)=> <tr key={member._id} className='text-center'>
                <td>{index+1}</td>
                <td>{member.employeeName}</td>
                <td>{member.employeeEmail}</td>
                <td>{member.companyName}</td>
            </tr>)
            }
        </tbody>
    </table>
</div>
<div>



    <h2 className="text-2xl font-bold text-center mb-4 text-black mt-24 ">Team Members with Birthdays This Month</h2>
    <div className="overflow-x-auto mt-8">
    <table className="table text-black text-xl w-full mx-4 mt-8">
        <thead className='text-black text-2xl'>
            <tr className='text-black text-2xl text-center'>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>BirthDay</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            {
                currentMonthMembers.length === 0 && (
                    <tr>
                        <td colSpan="4" className="text-center text-gray-500">
                            No team members have birthdays this month
                        </td>
                    </tr>
                )
            }
            {
                currentMonthMembers.map((member,index)=> <tr key={member._id} className='text-center'>
                <td>{index+1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.dateOfBirth}</td>
                <td>
                    <button className="btn btn-sm btn-primary text-white rounded-2xl" onClick={()=>handleSendWish(member)}>Send Wishes</button>
                </td>
            </tr>)
}
        </tbody>
        
            </table>

</div>
</div>






        
    </div>
  );
};

export default MyTeam;