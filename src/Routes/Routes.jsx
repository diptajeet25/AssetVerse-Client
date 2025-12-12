import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import AuthPage from "../Pages/AuthPage";
import RegisterHR from "../Pages/RegisterHR";
import RegisterEmployee from "../Pages/RegisterEmployee";
import Login from "../Pages/Login";

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
  }

]);