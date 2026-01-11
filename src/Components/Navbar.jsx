import React, { useContext, useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import useTheme from '../Hooks/useTheme';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogOut = () => {
    logoutUser().then(() => {
      toast.success("Logged Out Successfully");
      navigate("/auth/login");
    });
  };

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/user?email=${user.email}`).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, [user, axiosSecure]);

  const links = (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-6 font-bold text-lg">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>

      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/profile">My Profile</Link>
        </>
      ) : (
        <>
          <Link to="/auth/register-hr">Join As HR</Link>
          <Link to="/auth/register-employee">Join as Employee</Link>
        </>
      )}
    </div>
  );

  const adminLinks = (
    <div className="flex flex-col">
      <Link to="/dashboard" className="btn btn-ghost">Asset List</Link>
      <Link to="/dashboard/add-asset" className="btn btn-ghost">Add Asset</Link>
      <Link to="/dashboard/request-asset-list" className="btn btn-ghost">All Request</Link>
      <Link to="/dashboard/my-employees" className="btn btn-ghost">Employee List</Link>
      <Link to="/dashboard/profile" className="btn btn-ghost">My Profile</Link>
      <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
    </div>
  );

  const employeeLinks = (
    <div className="flex flex-col">
      <Link to="/dashboard/my-assets" className="btn btn-ghost">My Assets</Link>
      <Link to="/dashboard/my-team" className="btn btn-ghost">My Team</Link>
      <Link to="/dashboard/request-asset" className="btn btn-ghost">Request Asset</Link>
      <Link to="/dashboard/profile" className="btn btn-ghost">My Profile</Link>
      <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
    </div>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-200/90 backdrop-blur shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow"
            >
              {links}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost">
            <img src={logo} alt="AssetVerse Logo" className="w-40" />
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <img
                  src={userInfo?.profileImage}
                  alt="profile"
                  className="rounded-full w-10 h-10"
                />
              </div>
              <ul className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow">
                {userInfo?.role === "HR" ? adminLinks : employeeLinks}
              </ul>
            </div>
          ) : (
            <Link to="/auth/login" className="btn btn-accent font-bold">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
