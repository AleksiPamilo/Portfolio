import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

type LayoutProps = {
    handleContactModal: () => void;
}

const Layout: React.FC<LayoutProps> = ({ handleContactModal }) => {
    return (
        <>
            <Footer handleContactModal={handleContactModal} />
            <Outlet />
        </>
    )
}

export default Layout;
