import React, { useContext, useRef, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 5;

const MyEmployees = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const modalRef = useRef();

  const { user, loading } = useContext(AuthContext);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(1);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['my-employees', user?.email, page],
    enabled: !!user?.email && !loading,
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employees?hrEmail=${user.email}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
  });

  const employees = Array.isArray(data?.employees)
    ? data.employees
    : Array.isArray(data)
    ? data
    : [];

  const totalPages =
    typeof data?.totalPages === 'number'
      ? data.totalPages
      : Math.max(1, Math.ceil(employees.length / ITEMS_PER_PAGE));

  // ================= Assets Count =================
  const { data: assets = [] } = useQuery({
    queryKey: ['my-assets', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `assetscount?hrEmail=${user.email}`
      );
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // ================= Available Assets =================
  const { data: availableAssets = [] } = useQuery({
    queryKey: ['my-assets-to-assign', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `myassetsToassigninModal?hrEmail=${user.email}`
      );
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // ================= Handlers =================
  const handleModalOpen = (emp) => {
    setSelectedEmployee(emp);
    modalRef.current.showModal();
  };

  const handleDelete = (emp) => {
    axiosSecure
      .patch('/deleteEmployee', emp)
      .then((res) => {
        if (
          res.data?.employeeUpdate?.modifiedCount > 0 &&
          res.data?.userUpdate?.modifiedCount > 0
        ) {
          toast.success('Employee Deleted Successfully');
          refetch();
        }
      })
      .catch(() => {
        toast.error('Failed to delete employee.');
      });
  };

  const handleFinalAssign = (asset) => {
    const assignInfo = {
      assetId: asset._id,
      assetName: asset.productname,
      assetImage: asset.productImage,
      assetType: asset.productType,
      employeeEmail: selectedEmployee.employeeEmail,
      employeeName: selectedEmployee.employeeName,
      hrEmail: user.email,
      companyName: asset.companyName,
      assignmentDate: new Date(),
      status: 'assigned',
    };

    axiosSecure
      .post('/assignAssetByHR', assignInfo)
      .then((res) => {
        if (
          res.data?.assignedAsset?.insertedId &&
          res.data?.updatedAsset?.modifiedCount > 0
        ) {
          toast.success('Asset Assigned Successfully');
          modalRef.current.close();
          refetch();
          queryClient.invalidateQueries(['my-assets', user.email]);
          queryClient.invalidateQueries([
            'my-assets-to-assign',
            user.email,
          ]);
        }
      })
      .catch(() => {
        toast.error('Failed to assign asset.');
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
      <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
        My Employees: {employees.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-lg mt-8">
          <thead className="text-xl">
            <tr className="text-center">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Asset Count</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center opacity-70 py-6">
                  No employees found
                </td>
              </tr>
            )}

            {employees.map((emp, index) => (
              <tr key={emp._id} className="text-center">
                <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{emp.employeeName}</td>
                <td>{emp.employeeEmail}</td>
                <td>
                  {new Date(emp.affiliationDate).toLocaleDateString()}
                </td>
                <td>
                  {
                    assets.filter(
                      (a) =>
                        a.employeeEmail === emp.employeeEmail
                    ).length
                  }
                </td>
                <td className="flex justify-center gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleModalOpen(emp)}
                  >
                    Assign Asset
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(emp)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
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

      {/* Assign Asset Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 text-base-content">
          <h3 className="font-bold text-lg">Assign Asset</h3>

          <table className="table w-full mt-4">
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {availableAssets.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center opacity-70"
                  >
                    No available assets
                  </td>
                </tr>
              )}

              {availableAssets.map(
                (asset, index) =>
                  asset.availableQuantity > 0 && (
                    <tr key={asset._id} className="text-center">
                      <td>{index + 1}</td>
                      <td>{asset.productname}</td>
                      <td>{asset.productType}</td>
                      <td>{asset.availableQuantity}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            handleFinalAssign(asset)
                          }
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyEmployees;
