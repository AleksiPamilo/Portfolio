import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDocs, collection, query, where, deleteDoc } from "firebase/firestore";
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
    }, []);

    useEffect(() => {
        getDocs(collection(db, "contact"))
            .then((x) => {
                const arr: any = [];

                x.forEach((doc) => {
                    arr.push(doc.data());
                });

                setEmails(arr);
            });
    }, []);

    const deleteMail = (email: Iemail) => {
        const q = query(collection(db, "contact"), where("id", "==", email.id));

        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach(async (document) => {
                    await deleteDoc(doc(db, "contact", document.id))
                })
            });
    }

    return !isAdmin
        ? (
            <div className="text-center text-2xl font-bold mt-64">
                <p>Not logged in</p>
                <Link to="/login" className="text-blue-600">Log In</Link>
            </div>
        )
        : (
            <div>
                <Emails emails={emails} deleteMail={deleteMail} />
                <Footer />
            </div>
        );
}

export default Email;
