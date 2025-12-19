import React, { use, useState } from 'react';
import Package from '../Components/Package';
import { AuthContext } from '../Contexts/AuthContext';
import MyPayment from '../Components/MyPayment';

const Payment = () => {
    const {user,loading}=use(AuthContext);
    const [payment,setPayment]=useState(false);

    if(loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
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
        <Package setPayment={setPayment} payment={payment} />
        <MyPayment payment={payment}></MyPayment>

        



    </div>
  );
};

export default Payment;