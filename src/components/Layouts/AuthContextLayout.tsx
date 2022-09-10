import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../context/authContextProvider";

const AuthContextLayout: React.FC = () => {
    return (
        <AuthContextProvider>
            <Outlet />
        </AuthContextProvider>
    )
}

export default AuthContextLayout;
