import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Iemail } from "../../../../Interfaces/contact";

import Footer from "../../../Footer/ManagementFooter";
import FirebaseServices from "../../../../firebase/firebaseServices";
import Emails from "./Emails";

const db = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();

const Email: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [emails, setEmails] = useState<Iemail[]>([]);

    useEffect(() => {
        if (!authInstance || authInstance.currentUser === null) return setIsAdmin(false);
        else {
            const unsubscribe = onAuthStateChanged(authInstance, (user) => {
                if (user) {
                    user.getIdTokenResult()
                        .then((idTokenResult) => {
                            setIsAdmin(!!idTokenResult.claims.admin);
                            //console.log("Email verified", user.emailVerified);
                        })
                } else {
                    setIsAdmin(false);
                }
            });

            return () => unsubscribe();
        }
    }, []);

    useEffect(() => {
        getDoc(doc(db, "portfolio", "contact")).then((res) => { if (res.exists()) setEmails(res.data().emails) })
    }, []);

    const deleteMail = (email: Iemail) => {
        for (let i = 0; i < emails.length; i++) {
            if (emails[i].index === email.index) {
                emails.splice(i, 1);
                break;
            }
        };

        updateDoc(doc(db, "portfolio", "contact"), { emails });
    }

    return !isAdmin
        ? (
            <div className="text-center text-2xl font-bold mt-64">
                <p>Not logged in</p>
                <Link to="/login" className="text-blue-600">Log In</Link>
            </div>
        )
        : (
            <div className="text-center">
                <Emails emails={emails} deleteMail={deleteMail} />
                <Footer />
            </div>
        );
}

export default Email;
