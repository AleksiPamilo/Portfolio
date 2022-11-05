import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
//import Footer from "../Footer";

const Layout: React.FC = () => {
    return (
        <>
            <Navigation />
            {/* {
                window.location.pathname.includes("management")
                    ? null
                    : <Footer />
            } */}
            <Outlet />
        </>
    )
}

export default Layout;
