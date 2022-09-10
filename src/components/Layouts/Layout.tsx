import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import Footer from "../Footer";

type LayoutProps = {
    handleContactModal: () => void;
}

const Layout: React.FC<LayoutProps> = ({ handleContactModal }) => {
    return (
        <>
            <Navigation />
            {
                window.location.pathname.includes("management")
                    ? null
                    : <Footer handleContactModal={handleContactModal} />
            }
            <Outlet />
        </>
    )
}

export default Layout;
