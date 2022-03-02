import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import "./Main.css";

import FirebaseServices from "../../../firebase/firebaseServices";
import NotLoggedIn from "../../Management/NotLoggedIn";
import BarChart from "../../barChart";

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
        <div className="pl-32 md:pl-80">
            <BarChart />
        </div>
    )
}

export default Management;
