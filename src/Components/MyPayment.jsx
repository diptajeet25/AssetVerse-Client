import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const MyPayment = ({ payment }) => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['my-payments', user?.email],
    enabled: !!user?.email && !payment,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?hrEmail=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg"></span>
          <p className="text-lg font-semibold animate-pulse text-(--text-secondary)">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold text-center mt-24 mb-16 text-(--text-primary)">
        My Payments
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="text-(--text-primary) text-xl">
            <tr className="text-center font-bold">
              <th>#</th>
              <th>Transaction ID</th>
              <th>Package Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody className="text-center text-lg text-[var(--text-primary)]">
            {payments.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-[var(--text-secondary)]">
                  No payments found
                </td>
              </tr>
            )}

            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.paymentIntent}</td>
                <td>{payment.packageName}</td>
                <td>${payment.packagePrice}</td>
                <td>
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPayment;
