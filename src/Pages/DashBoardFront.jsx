import React, { use } from 'react';
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Contexts/AuthContext';
import AssetList from './AssetList';
import MyAsset from './MyAsset';
import Chart from './Chart';

const DashBoardFront = () => {
    const role=useRole();
    const {loading}=use(AuthContext);
    if(loading)
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
    if(role.role==="HR")
        return<> <AssetList></AssetList>
        <Chart></Chart>
        </>
 else if(role.role==="employee")
    return <MyAsset></MyAsset>
};

export default DashBoardFront;