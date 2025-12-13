import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import AuthPage from "../Pages/AuthPage";
import RegisterHR from "../Pages/RegisterHR";
import RegisterEmployee from "../Pages/RegisterEmployee";
import Login from "../Pages/Login";
import DashBoardLayout from "../Layout/DashBoardLayout";
import AddAsset from "../Pages/AddAsset";
import AssetList from "../Pages/AssetList";

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
    element:<DashBoardLayout></DashBoardLayout>,
    children:[
      {
        index:true,
        element:<AssetList></AssetList>
      },
      {
        path:"add-asset",
        element:<AddAsset></AddAsset>
      }
    ]

  }

]);