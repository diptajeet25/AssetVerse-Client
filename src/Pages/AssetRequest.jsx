import React, { useContext, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 10;

const AssetRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const {
    data,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['asset-requests', user?.email, page],
    enabled: !!user?.email && !loading,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests?hrEmail=${user.email}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
  });

  // ✅ SAFE DERIVED VALUES
  const requests = Array.isArray(data?.requests) ? data.requests : [];
  const total = typeof data?.total === 'number' ? data.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  const handleApprove = (req) => {
    axiosSecure.patch(`/requests-approve/${req._id}`, req).then((res) => {
      if (
        res.data?.requestUpdate?.modifiedCount > 0 &&
        res.data?.assignedAsset?.insertedId
      ) {
        refetch();
        toast.success('Request Approved Successfully');
      } else {
        toast.error(res.data?.message || 'Approval failed');
      }
    });
  };

  const handleReject = (req) => {
    axiosSecure.patch(`/requests-reject/${req._id}`, req).then((res) => {
      if (res.data?.result?.modifiedCount > 0) {
        refetch();
        toast.success('Request Rejected Successfully');
      }
    });
  };

  if (loading || isLoading) {
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

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
        All Requests
      </h2>

      <div className="overflow-x-auto mt-8">
        <table className="table text-base-content text-lg w-full">
          <thead>
            <tr className="text-xl">
              <th>#</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Asset</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 opacity-70">
                  No requests found
                </td>
              </tr>
            )}

            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{req.requesterName}</td>
                <td>{req.requesterEmail}</td>
                <td>{req.assetName}</td>
                <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                <td>{req.requestStatus}</td>
                <td>
                  {req.requestStatus === 'approved' && (
                    <span className="btn btn-sm btn-primary cursor-default">
                      Approved
                    </span>
                  )}

                  {req.requestStatus === 'rejected' && (
                    <span className="btn btn-sm btn-error cursor-default">
                      Rejected
                    </span>
                  )}

                  {req.requestStatus === 'Pending' && (
                    <>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleApprove(req)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-secondary ml-2"
                        onClick={() => handleReject(req)}
                      >
                        Deny
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > ITEMS_PER_PAGE && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`btn btn-sm ${
                page === num + 1 ? 'btn-primary' : ''
              }`}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetRequest;
