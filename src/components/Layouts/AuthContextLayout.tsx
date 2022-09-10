import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../context/authContextProvider";

type AuthContextLayoutProps = {};
const AuthContextLayout: React.FC<AuthContextLayoutProps> = () => {
    return (
        <AuthContextProvider>
            <Outlet />
        </AuthContextProvider>
    )
}

export default AuthContextLayout;
