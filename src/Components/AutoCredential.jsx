import React, { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const AutoCredential = () => {
    const {loginUser}=use(AuthContext);
    const navigate=useNavigate();
    const handleHRAuto = () => {
        
        loginUser("diptajeet1116@student.nstu.edu.bd", "Dip147@")
        .then(() => {
            toast.success("Logged in as HR successfully");
            navigate("/");
            
        })
        .catch(() => {
            toast.error("Failed to log in as HR");
        }); 

    }
    const handleEmployeeAuto = () => {
        loginUser("raiyan@gmail.com", "Dip147@")
        .then(() => {
            toast.success("Logged in as Employee successfully");
            navigate("/");
       
        })
        .catch(() => {
            toast.error("Failed to log in as Employee");
        }
        );
    }

    return <div className="flex flex-col gap-4 w-full">
        <button className="btn btn-primary" onClick={handleHRAuto}>Auto Credential(HR)</button>
        <button className="btn btn-primary" onClick={handleEmployeeAuto}>Auto Credential(Employee)</button>
    </div>;
};

export default AutoCredential;