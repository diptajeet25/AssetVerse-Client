import React, { use, useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import PieChart from './PieChart';
import { ArrowUpIcon, ArrowDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

const AssetList = () => {
    const {user,loading}=use(AuthContext);
   

    const axiosSecure=useAxiosSecure();
    const modalref=useRef();
    const [assets,setAssets]=useState({})
    const { register, handleSubmit,setValue, formState: { errors }} =useForm();
  
    // State for sorting, filtering, searching, and pagination
    const [sortField, setSortField] = useState('dateAdded'); // 'productname', 'productType', 'quantity', 'availableQuantity', 'dateAdded'
    const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'returnable', 'non-returnable'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

const {
  data,
  refetch,
  isLoading
} = useQuery({
  queryKey: ['assets', user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/assets?hrEmail=${user.email}`
    );
    if (Array.isArray(res.data)) {
      return res.data;
    } else {
      return [];
    }
  }
});


const assetFetch = Array.isArray(data) ? data : [];

// Memoized filtered, sorted, and paginated assets
const processedAssets = useMemo(() => {
  let filtered = [...assetFetch];

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(asset =>
      asset.productname?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply type filter
  if (filterType !== 'all') {
    filtered = filtered.filter(asset => asset.productType === filterType);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue, bValue;

    switch (sortField) {
      case 'productname':
        aValue = a.productname?.toLowerCase() || '';
        bValue = b.productname?.toLowerCase() || '';
        break;
      case 'productType':
        aValue = a.productType?.toLowerCase() || '';
        bValue = b.productType?.toLowerCase() || '';
        break;
      case 'quantity':
        aValue = Number(a.quantity) || 0;
        bValue = Number(b.quantity) || 0;
        break;
      case 'availableQuantity':
        aValue = Number(a.availableQuantity) || 0;
        bValue = Number(b.availableQuantity) || 0;
        break;
      case 'dateAdded':
        aValue = new Date(a.dateAdded || 0).getTime();
        bValue = new Date(b.dateAdded || 0).getTime();
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  return filtered;
}, [assetFetch, searchTerm, filterType, sortField, sortDirection]);

// Pagination calculations
const totalPages = Math.ceil(processedAssets.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedAssets = processedAssets.slice(startIndex, endIndex);

// Reset to page 1 when filters change
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, filterType, sortField, sortDirection]);

const handleSort = (field) => {
  if (sortField === field) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortField(field);
    setSortDirection('asc');
  }
};
 
const handleEdit = (data) => {
  setAssets(data);

  setValue("productImage", data.productImage);
  setValue("productname", data.productname);
  setValue("productType", data.productType);
  setValue("quantity", data.quantity);
    setValue("hrEmail", data.hrEmail);
    setValue("companyName", data.companyName);

  modalref.current.showModal();
};

  const handleUpdateAsset=(data)=>
  {
   
    const availableQuantity=data.quantity - (assets.quantity - assets.availableQuantity);
    data.availableQuantity=availableQuantity;
    axiosSecure.patch(`/asset/${assets._id}`,data)
    .then((res)=>
    {
        if(res.data.modifiedCount>0)
        {
           toast.success("Asset Updated Successfully");
            modalref.current.close();
            refetch();
        }
        else
        {
            toast.error("No changes were made.");
        }

    })

  }

  const handleDeleteAsset=(id)=>
  {
    Swal.fire({
  title: "Are you sure?",
  text: "This asset will be deleted permanently!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.delete(`/asset/${id}`)
    .then((res)=>
    {
        if(res.data.deletedCount>0)
        {
            refetch();
            Swal.fire({
      title: "Deleted!",
      text: "Your asset has been deleted.",
      icon: "success"
    });
        }
    })
    
  }
});
  }

  const handleSearch=(e)=>
  {
    setSearchTerm(e.target.value);
  }

  if(loading)
  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p className="text-lg font-semibold text-base-content opacity-70 animate-pulse">
          Please wait...
        </p>
      </div>
    </div>);


 

  return (
    <div className='text-base-content min-h-200'>
        <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
          Company's Assets: {processedAssets.length} {processedAssets.length !== assetFetch.length && `(of ${assetFetch.length} total)`}
        </h2>

        {/* Search and Filter Controls */}
        <div className='my-6 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center mx-4 md:mx-16'>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <input 
                onChange={(e)=>handleSearch(e)} 
                type="text" 
                name="search"  
                placeholder="Search Asset by Name" 
                value={searchTerm}
                className="input input-bordered w-full md:w-64" 
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-base-content opacity-70" />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select select-bordered w-full md:w-48"
              >
                <option value="all">All Types</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </select>
            </div>
          </div>

          {/* Results info */}
          <div className="text-sm opacity-70">
            Showing {startIndex + 1}-{Math.min(endIndex, processedAssets.length)} of {processedAssets.length}
          </div>
        </div>


        <div className="overflow-x-auto">
  <table className="table ">
  
    <thead>
      <tr className='text-base-content font-bold text-2xl text-center'>
        <th>#</th>
        <th>
          <button 
            onClick={() => handleSort('productname')}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            Product Name
            {sortField === 'productname' && (
              sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
            )}
          </button>
        </th>
        <th>
          <button 
            onClick={() => handleSort('productType')}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            Product Type
            {sortField === 'productType' && (
              sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
            )}
          </button>
        </th>
        <th>
          <button 
            onClick={() => handleSort('quantity')}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            Quantity
            {sortField === 'quantity' && (
              sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
            )}
          </button>
        </th>
        <th>
          <button 
            onClick={() => handleSort('availableQuantity')}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            Available
            {sortField === 'availableQuantity' && (
              sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
            )}
          </button>
        </th>
        <th>
          <button 
            onClick={() => handleSort('dateAdded')}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            Date Added
            {sortField === 'dateAdded' && (
              sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
            )}
          </button>
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
{paginatedAssets.length === 0 && !isLoading && (
    <tr>
      <td colSpan="7" className="text-center text-base-content opacity-70">
        {searchTerm || filterType !== 'all' ? 'No assets found matching your criteria' : 'No assets found'}
      </td>
    </tr>
  )}

 {paginatedAssets.map((a,i)=>

      <tr key={a._id || i} className='text-2xl text-center'>
        <th>{startIndex + i + 1}</th>
       <td>
  <div className="flex items-center justify-center gap-3">
    <img
      src={a.productImage}
      alt={a.productname}
      className="w-16 h-16 object-cover rounded"
    />
    <span className="font-medium">{a.productname}</span>
  </div>
</td>

        <td>{a.productType}</td>
        <td>{a.quantity}</td>
        <td>{a.availableQuantity}</td>
        <td>{new Date(a.dateAdded).toLocaleDateString()}</td>
        <td className='flex gap-2 justify-center items-center'>
            <button className='btn btn-primary' onClick={()=>handleEdit(a)}>Edit</button>
            <button className='btn btn-warning' onClick={()=>handleDeleteAsset(a._id)}>Delete</button>
        </td>
      </tr>

) }
    
    
    
    </tbody>
  </table>
</div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 mb-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              Previous
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="btn btn-sm btn-disabled">...</span>;
                }
                return null;
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              Next
            </button>
          </div>
        )}

<dialog  ref={modalref} className="modal">
  <div className="modal-box w-11/12 max-w-5xl bg-base-100 ">
    <h3 className="font-bold text-2xl text-center text-base-content">Edit Product Information!</h3>
     <form onSubmit={handleSubmit(handleUpdateAsset)}  className="space-y-5 mb-2">
            <div>
     <label className="font-semibold text-base-content">Product Name</label>
          <input
            type="text"
            {...register("productname",{required:true})}
            placeholder="Enter Product name"
            className="input input-bordered w-full text-white"
           
          />
           {errors.productname?.type==="required" && <p className='text-red-600'>Name is required</p>}
</div>
          <div>
     <label className="font-semibold text-base-content">Product Image</label>
          <input
            type="url"
            {...register("productImage",{required:true})}
            placeholder="Enter Product Image"
            className="input input-bordered w-full text-white"
           
          />
           {errors.productImage?.type==="required" && <p className='text-red-600'>Image Link is required</p>}
</div>
<div>
  <label className="font-semibold text-base-content">Product Type</label>

  <select
    {...register("productType", { required: true })}
    className="select select-bordered w-full text-white"
 

  >
    <option value="" disabled>
      Select product type
    </option>
    <option value="returnable">Returnable</option>
    <option value="non-returnable">Non-Returnable</option>
  </select>

  {errors.productType?.type === "required" && (
    <p className="text-red-600">Product type is required</p>
  )}
</div>
<div>
  <label className="font-semibold text-base-content">Product Quantity</label>

  <input
    type="number"
    {...register("quantity", {
      required: true,
      min: 1
    })}
    placeholder="Enter quantity"
    className="input input-bordered w-full text-white"
   
  />

  {errors.quantity?.type === "required" && (
    <p className="text-red-600">Quantity is required</p>
  )}

  {errors.quantity?.type === "min" && (
    <p className="text-red-600">Quantity must be at least 1</p>
  )}
</div>
<div>
  <label className="font-semibold text-base-content">HR Email</label>

  <input
    type="email"
    {...register("hrEmail")}
    placeholder="Enter HR Email"
    className="input input-bordered w-full text-white"
    readOnly
  />


</div>

<div>
  <label className="font-semibold text-base-content">Company Name</label>

  <input
    type="text"
    {...register("companyName")}
    placeholder="Enter Company Name"
    className="input input-bordered w-full text-white"
    readOnly
  />


</div>
<button type="submit" className="btn btn-primary w-full text-lg mt-4">
       Add Asset
        </button>
        </form>


    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


    </div>
  );
};

export default AssetList;