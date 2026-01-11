import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 10;

const MyAsset = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['my-assets', user?.email, page],
    enabled: !!user?.email && !loading,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myassets?employeeEmail=${user.email}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
  });

  // ✅ SAFE DERIVED VALUES
  const assets = Array.isArray(data?.assets) ? data.assets : [];
  const totalPages =
    typeof data?.totalPages === 'number' && data.totalPages > 0
      ? data.totalPages
      : 1;

  const handleReturn = (asset) => {
    axiosSecure.patch(`/return-asset/${asset._id}`, asset).then((res) => {
      if (
        res.data?.assignedAssetUpdate?.modifiedCount > 0 &&
        res.data?.assetUpdate?.modifiedCount > 0
      ) {
        toast.success('Asset Returned Successfully');
        refetch();
      }
    });
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-primary"></span>
          <p className="text-lg font-semibold opacity-70 animate-pulse">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        My Assets
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-lg mt-8">
          <thead className="text-xl">
            <tr className="text-center">
              <th>#</th>
              <th>Product</th>
              <th>Type</th>
              <th>Company</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center opacity-60 py-6">
                  No assets found
                </td>
              </tr>
            )}

            {assets.map((asset, index) => (
              <tr key={asset._id} className="text-center">
                <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>

                <td className="flex items-center justify-center gap-3">
                  <img
                    src={asset.assetImage}
                    alt={asset.assetName}
                    className="w-14 h-14 object-cover"
                  />
                  <span>{asset.assetName}</span>
                </td>

                <td>{asset.assetType}</td>
                <td>{asset.companyName}</td>
                <td>{asset.employeeEmail}</td>
                <td>
                  {new Date(asset.assignmentDate).toLocaleDateString()}
                </td>
                <td>{asset.status}</td>
                <td>
                  {asset.assetType === 'returnable' ? (
                    <button
                      className="btn btn-sm btn-error rounded-xl"
                      onClick={() => handleReturn(asset)}
                    >
                      Return
                    </button>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="btn btn-outline btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              className={`btn btn-sm ${
                page === num + 1 ? 'btn-primary' : 'btn-outline'
              }`}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}

          <button
            className="btn btn-outline btn-sm"
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

export default MyAsset;
