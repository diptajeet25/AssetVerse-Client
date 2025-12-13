import React from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { FaRectangleList } from 'react-icons/fa6';
import { GiArmorUpgrade } from 'react-icons/gi';
import { GoSidebarCollapse } from 'react-icons/go';
import { IoIosSettings } from 'react-icons/io';
import { LuPackagePlus, LuPackageSearch } from 'react-icons/lu';
import { RiPassPendingFill } from 'react-icons/ri';
import { Link, Outlet } from 'react-router';
import useRole from '../Hooks/useRole';
import { SiMyget } from "react-icons/si";
import { PackagePlus } from 'lucide-react';
import { RiTeamFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const DashBoardLayout = () => {
  const role=useRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    
    <nav className="navbar w-full bg-base-300 text-2xl">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
       <GoSidebarCollapse />
      </label>
      <div className="px-4">DashBoard</div>
    </nav>
  
    <div className="p-4">
        <Outlet></Outlet>
    </div>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      <ul className="menu w-full grow">
     
        <li><Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Homepage">

          <FaHome />
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>
        {
          role.role==="HR" ? <>

          <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Asset-List">

          <FaRectangleList />
            <span className="is-drawer-close:hidden">Asset List</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard/add-asset" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Add-Asset">

          <LuPackagePlus />
            <span className="is-drawer-close:hidden">Add Asset</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Employee Request">

         <RiPassPendingFill />
            <span className="is-drawer-close:hidden">Employee Request</span>
          </Link>
        </li>
         <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Asset Request">

         <LuPackageSearch />
            <span className="is-drawer-close:hidden">Asset Request</span>
          </Link>
        </li>
     
        <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="My-Employee">

         <FaUser />
            <span className="is-drawer-close:hidden">My Employee</span>
          </Link>
        </li>
 <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Upgrade-Package">

           <GiArmorUpgrade />
            <span className="is-drawer-close:hidden">Upgrade Package</span>
          </Link>
        </li>
          
          </>: <>

          <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="My Asset">

          <SiMyget />
            <span className="is-drawer-close:hidden">My Asset</span>
          </Link>
        </li>

        <li>
          <Link to="/dashboard/add-asset" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Request an Asset">

         <PackagePlus />
            <span className="is-drawer-close:hidden">Request an Asset</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="MY TEAM">

         <RiTeamFill />
            <span className="is-drawer-close:hidden">MY TEAM</span>
          </Link>
        </li>
          </>
          


        }
           <li>
          <Link to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="My Profile">

        <CgProfile />
            <span className="is-drawer-close:hidden">My Profile</span>
          </Link>
        </li>

      
       
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl" data-tip="Settings">
           
           <IoIosSettings />
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
  );
};

export default DashBoardLayout;