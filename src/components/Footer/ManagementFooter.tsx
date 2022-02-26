import React from "react";
import { Link } from "react-router-dom";

const ManagementFooter: React.FC = () => {
    return (
        <footer className="absolute bottom-0 w-full h-12 text-center bg-black pt-3">
            <Link to="/login" className="text-blue-600 font-bold">Back to login</Link>
        </footer>
    )
}

export default ManagementFooter;
