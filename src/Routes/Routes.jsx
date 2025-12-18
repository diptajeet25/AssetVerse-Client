import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import AuthPage from "../Pages/AuthPage";
import RegisterHR from "../Pages/RegisterHR";
import RegisterEmployee from "../Pages/RegisterEmployee";
import Login from "../Pages/Login";
import DashBoardLayout from "../Layout/DashBoardLayout";
import AddAsset from "../Pages/AddAsset";
import ProfilePage from "../Pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import DashBoardFront from "../Pages/DashBoardFront";
import RequestAsset from "../Pages/RequestAsset";
import AdminRoute from "./AdminRoute";
import EmployeeRoute from "./EmployeeRoute";
import AssetRequest from "../Pages/AssetRequest";
import MyEmployees from "../Pages/MyEmployees";
import MyAsset from "../Pages/MyAsset";
import MyTeam from "../Pages/MyTeam";
import Payment from "../Pages/Payment";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>
  },
  {
    path:"/auth",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        index:true,
        element:<AuthPage></AuthPage>
      },
      {
        path:"register-hr",
        element:<RegisterHR></RegisterHR>
      },
      {
        path:"register-employee",
        element:<RegisterEmployee></RegisterEmployee>
      },
      {
        path:"login",
        element:<Login></Login>
      }
    ]
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[
      {
        index:true,
        element:<DashBoardFront></DashBoardFront>
      },
      {
        path:"add-asset",
        element: <AdminRoute><AddAsset></AddAsset></AdminRoute>
      },
      {
        path:"request-asset-list",
        element:<AdminRoute><AssetRequest></AssetRequest></AdminRoute>

      },
      {
        path:"profile",
        element:<ProfilePage></ProfilePage>
      },
      {
        path:"request-asset",
        element:<EmployeeRoute><RequestAsset></RequestAsset></EmployeeRoute>
      },
      {
        path:"my-employees",
        element:<AdminRoute><MyEmployees></MyEmployees></AdminRoute>
      },
      {
        path:"my-assets",
        element:<EmployeeRoute><MyAsset></MyAsset></EmployeeRoute>
      },
      {
        path:"my-team",
        element:<EmployeeRoute><MyTeam></MyTeam></EmployeeRoute>
      },
      {
        path:"subscription",
        element:<Payment></Payment>
      }
    ]

  }

]);