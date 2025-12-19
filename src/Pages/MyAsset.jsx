import React, { use, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const MyAsset = () => {
  const {user,loading}=use(AuthContext);
  const axiosSecure=useAxiosSecure();
  const [myassets,setMyAssets]=useState([])
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const limit = 10;


 const { data, refetch, isLoading } = useQuery({
  queryKey: ['my-assets', user?.email, page],
  enabled: !!user?.email && !loading,
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/myassets?employeeEmail=${user.email}&page=${page}&limit=${limit}`
    );
    setMyAssets(res.data.assets || []);
    setTotalPages(res.data.totalPages || 1);

    return res.data;
  }
});



const handleReturn=(asset)=>
{
  axiosSecure.patch(`/return-asset/${asset._id}`,asset)
  .then((res)=>
  {

    if(res.data.assignedAssetUpdate.modifiedCount>0 && res.data.assetUpdate.modifiedCount>0)
    {
     toast.success("Asset Returned Successfully");
      refetch();

    }


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
      <h2 className="text-3xl font-bold text-center mb-6 text-black  "> My Assets </h2>
      <div className="overflow-x-auto">
      <table className="table  w-full text-black text-xl mx-8 mt-8">
        <thead className='text-black text-2xl'>
          <tr className='text-center'>
            <th>#</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Company Name</th>
            <th>Employee Email</th>
            <th>Assignment Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {myassets.length === 0 && !isLoading && (
    <tr>
      <td colSpan="7" className="text-center text-gray-500">
        No assets found
      </td>
    </tr>
  )}
        {
          myassets.map((asset,index)=>(
            <tr key={asset._id} className='text-center'>
              <td>{index+1}</td>
              <td className='flex items-center justify-center gap-3'>
                <img src={asset.assetImage} alt={asset.productName}  className='w-16 h-16'/>
                <p>{asset.assetName}</p>
              </td>
              <td>{asset.assetType}</td>
              <td>{asset.companyName}</td>
              <td>{asset.employeeEmail}</td>
              <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>
              <td>{asset.status}</td>
              <td>
                {
                asset.assetType==="returnable" ?
                <button className="btn btn-sm btn-danger text-white rounded-2xl" onClick={()=>handleReturn(asset)}>Return Asset</button> :
                 <>
                  N/A
                
                </>
}
</td>
            </tr>
          ))
        }
        </tbody>
      </table>
      </div>

<div className="flex justify-center items-center gap-2 mt-6">

 
  {page>1 && <button className="btn btn-outline text-black" disabled={page === 1}  onClick={() => setPage(page - 1)}>Prev</button>
}
 {
    [...Array(totalPages).keys()].map(num => (
      <button key={num} className={`btn text-black ${page === num + 1 ? "btn-primary" : "btn-outline"}`}onClick={() => setPage(num + 1)}>{num + 1}</button>
    ))
  }
  {page < totalPages &&
  <button className="btn btn-outline text-black" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
  }
</div>






      
      
      </div>
  );
};

export default MyAsset;