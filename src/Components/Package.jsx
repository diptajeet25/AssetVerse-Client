import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { toast } from 'react-toastify';

const Package = ({setPayment,payment}) => {
  const[packages,setPackages]=useState([]);
  const [paymentVerified, setPaymentVerified] = useState(false);


  useEffect(() => {
  fetch('/packages.json')

    .then(res => res.json())
    .then(data => setPackages(data))
    .catch(err => console.error(err));
}, []);


  const {user,loading}=useContext(AuthContext);
  const axiosSecure=useAxiosSecure();
  const [searchParams]=useSearchParams();
  const sessionId=searchParams.get("session_id");
 

  
useEffect(() => {

  if (!sessionId || !user || paymentVerified) return;

    if (sessionId && user) 
      {
        setPayment(true);
      
        axiosSecure.patch(`/payment-successful?session_id=${sessionId}`)
        .then((res)=>
        {
        
          
            if(res.data.modifiedCount>0)
            {
              toast.success("Payment Successful! Your package has been updated.");
               setPaymentVerified(true);
            }
        })
        .catch(()=>
        {
            console.log("Error verifying payment");
        }).finally(()=>
        {
          setPayment(false);
        })
        
    }
}, [sessionId, axiosSecure, user]);


  const {data}=useQuery({
    queryKey:['my-user-package',user?.email],
    enabled: !!user?.email && !payment,
    refetchOnWindowFocus:true,
    queryFn:async()=>
    {
      const res=await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    }
  })
  const currentUser=data;
  

const handlePayment = (pkg) => {
  const paymentData = {
    hrEmail: user.email,
    packageName: pkg.name,
    price: pkg.price,
    employeeLimit: pkg.employeeLimit,
  };


  axiosSecure.post('/create-checkout-session', paymentData)
    .then(res => {
      const checkoutUrl = res.data.url;
      window.location.replace(checkoutUrl);
     
    })
    .catch(err => {
      console.error(err);
    
    });
};

  if(loading)
  {
    return <div className='text-black'>Loading...</div>;
  }
  return (
    <div>
        <h1 className="text-4xl font-bold text-center mb-8 mt-8 text-black">Choose the Best Package for Your Team</h1>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6 pt-2">
            
      {packages.map((pkg, index) => (
        <div
          key={index}
          className="border rounded-xl p-6 shadow hover:shadow-lg text-black transition bg-white"
        >
        
          <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
          <p className=" text-sm mb-4">
            Employee Limit: {pkg.employeeLimit}
          </p>

          <div className="text-3xl font-bold mb-4">
            ${pkg.price}
            <span className="text-sm "> /month</span>
          </div>

          <ul className="mb-6 space-y-2">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {feature}
              </li>
            ))}
          </ul>

          {
            currentUser?.role !== 'HR' ?  (
              <p className="text-red-500 mb-4">Only HR users can select a package.</p>
            ) :
          
          
            currentUser?.subscription === pkg.name ? (
              <button disabled className="w-full text-white py-2 rounded-lg bg-gray-400 cursor-not-allowed">
                Current Package
              </button>
            ) : (
         
         <button onClick={()=>handlePayment(pkg)} className="w-full text-white py-2 rounded-lg bg-black hover:bg-gray-800">
         
            Choose Package
          </button>
            )
          
        }
         
        </div>
      ))}
    </div>

    </div>
  );
};

export default Package;