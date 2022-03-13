import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { isMobile } from "react-device-detect";

import "./Main.css";

import FirebaseServices from "../../../firebase/firebaseServices";
import NotLoggedIn from "../../Management/NotLoggedIn";
import BarChart from "../../barChart";
import DashboardCards from "../../Management/DashboardCards";

const authInstance = FirebaseServices.getAuthInstance();

const Management: React.FC = () => {
    document.title = "Portfolio – Management";

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                user.getIdTokenResult()
                    .then((idTokenResult) => {
                        setIsAdmin(!!idTokenResult.claims.admin);
                    })
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return !isAdmin ? (
        <NotLoggedIn />
    ) : (
        <>
            {
                isMobile
                    ? <div className="pt-44 pl-20 text-cyan-500">Email chart is disabled for mobile at the moment.</div>
                    : <div className="ml-[20rem] pt-12 flex flex-wrap">
                        <DashboardCards />
                        <BarChart />
                    </div>
            }
        </>
    )
}

export default Management;
