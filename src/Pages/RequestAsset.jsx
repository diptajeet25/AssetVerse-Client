import { useQuery } from '@tanstack/react-query';
import React, { use, useRef, useState, useMemo, useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import { ArrowUpIcon, ArrowDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

const RequestAsset = () => {
    const axiosSecure=useAxiosSecure();
    const [assets,setAssets]=useState({});
    const {user,loading}=use(AuthContext);
    const modalref=useRef();
    
    // State for sorting, searching, filtering, and pagination
    const [sortField, setSortField] = useState('dateAdded'); // 'productname', 'productType', 'quantity', 'availableQuantity', 'dateAdded', 'companyName'
    const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all', 'returnable', 'non-returnable'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const { data }=useQuery(
        {
            queryKey: ['users', user?.email],
            enabled: !!user?.email,
            queryFn: async()=>{
                const res=await axiosSecure.get(`user?email=${user.email}`);
                return res.data;
            }
        }
    )
    const userInfo=data;

     const {data: asset=[],refetch,isLoading}=useQuery(
        {
            queryKey: ['assets'],
            queryFn: async()=>{
                const res=await axiosSecure.get("/allassets");
                  if (Array.isArray(res.data)) {
      return res.data;
    } else {
      return [];
    }
            }
        }
     )

     // Filter assets with available quantity > 0
     const availableAssets = useMemo(() => {
       return asset.filter(a => a.availableQuantity > 0);
     }, [asset]);

     // Memoized filtered, sorted, and paginated assets
     const processedAssets = useMemo(() => {
       let filtered = [...availableAssets];

       // Apply search filter
       if (searchTerm) {
         filtered = filtered.filter(asset =>
           asset.productname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           asset.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           asset.productType?.toLowerCase().includes(searchTerm.toLowerCase())
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
           case 'companyName':
             aValue = a.companyName?.toLowerCase() || '';
             bValue = b.companyName?.toLowerCase() || '';
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
     }, [availableAssets, searchTerm, filterType, sortField, sortDirection]);

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

     const handleOpenModalRef=(a)=>
     {
        setAssets(a);
        modalref.current.showModal();
     }
     const handleRequestSubmit=(e)=>
     {
        e.preventDefault();
        const notes=e.target.notes.value;
        
        const requestData={
            assetId:assets._id,
            assetName:assets.productname,
            assetType:assets.productType,
            requesterName:userInfo?.name,
            requesterEmail:userInfo?.email,
            hrEmail:assets.hrEmail,
            companyName:assets.companyName,
            requestDate:new Date(),
            requestStatus:"Pending",
            notes:notes
        }
        axiosSecure.post('/requestAsset',requestData)
        .then((res)=>
        {
            if(res.data.insertedId)
            {
               toast.success("Asset Request Submitted Successfully");
                modalref.current.close();
                refetch();
            }
        })
     }

  if(loading || isLoading)
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
    <div className="px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
          Available Assets: {processedAssets.length} {processedAssets.length !== availableAssets.length && `(of ${availableAssets.length} total)`}
        </h2>

        {/* Search, Filter, and Sort Controls */}
        <div className='my-6 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center'>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <input 
                onChange={(e)=>setSearchTerm(e.target.value)} 
                type="text" 
                name="search"  
                placeholder="Search by name, company, or type" 
                value={searchTerm}
                className="input input-bordered w-full md:w-80" 
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

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <select 
                value={`${sortField}-${sortDirection}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('-');
                  setSortField(field);
                  setSortDirection(direction);
                }}
                className="select select-bordered w-full md:w-64"
              >
                <option value="dateAdded-desc">Newest First</option>
                <option value="dateAdded-asc">Oldest First</option>
                <option value="productname-asc">Name (A-Z)</option>
                <option value="productname-desc">Name (Z-A)</option>
                <option value="productType-asc">Type (A-Z)</option>
                <option value="productType-desc">Type (Z-A)</option>
                <option value="quantity-desc">Quantity (High to Low)</option>
                <option value="quantity-asc">Quantity (Low to High)</option>
                <option value="availableQuantity-desc">Available (High to Low)</option>
                <option value="availableQuantity-asc">Available (Low to High)</option>
                <option value="companyName-asc">Company (A-Z)</option>
                <option value="companyName-desc">Company (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Results info */}
          <div className="text-sm opacity-70 text-base-content">
            Showing {startIndex + 1}-{Math.min(endIndex, processedAssets.length)} of {processedAssets.length}
          </div>
        </div>

        {/* Assets Grid */}
        {paginatedAssets.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-lg text-base-content opacity-70">
              {searchTerm ? 'No assets found matching your search' : 'No available assets found'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {
    paginatedAssets.map((a)=>
      <div key={a._id} className="border border-base-300 p-4 rounded-lg shadow-lg bg-base-200 hover:shadow-xl transition">
        <img src={a.productImage} alt={a.productname} className='w-[80%] lg:w-[60%] h-60 mx-auto rounded-2xl my-4' />
        <h3 className="text-2xl font-bold mb-2">{a.productname}</h3>
        <p className="opacity-70 mb-1"><span className="font-semibold">Type:</span> {a.productType}</p>
        <p className="opacity-70 mb-1"><span className="font-semibold">Quantity:</span> {a.quantity}</p>
        <p className="opacity-70 mb-1"><span className="font-semibold">Available:</span> {a.availableQuantity}</p>
        <p className="opacity-70 mb-1"><span className="font-semibold">Company:</span> {a.companyName}</p>
        <p className="opacity-70 mb-1"><span className="font-semibold">Date Added:</span> {new Date(a.dateAdded).toLocaleDateString()}</p>
        <button className="mt-4 btn w-full btn-primary  text-white rounded-2xl " onClick={()=>handleOpenModalRef(a)}>Request Asset</button>
      </div>
    )
  }
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

<dialog ref={modalref} className="modal">
  <div className="modal-box w-11/12 max-w-5xl bg-base-100">
    <h3 className="font-bold text-lg text-center">Notes</h3>
    <form onSubmit={handleRequestSubmit}>
    <label className="font-semibold">Please provide specific needs for the asset you are requesting:</label>
  <textarea name="notes" className="textarea textarea-bordered w-full  mt-4 mb-4"></textarea>
  <button className="btn btn-primary w-full text-white rounded-2xl ">Submit Request</button>
  </form>
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

export default RequestAsset;