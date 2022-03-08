import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { Iemail } from "../../../../Interfaces/contact";

import FirebaseServices from "../../../../firebase/firebaseServices";
import Emails from "./Emails";
import EmailNotSent from "../../../popups/emailNotSent";
import NotLoggedIn from "../../../Management/NotLoggedIn";

const db = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();

const Email: React.FC = () => {
    document.title = "Portfolio – Management/Email";

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [emails, setEmails] = useState<Iemail[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

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

    useEffect(() => {
        getDocs(collection(db, "contact"))
            .then((snapshot) => {
                const arr: any = [];

                snapshot.forEach((doc) => {
                    arr.push(doc.data());
                });

                setEmails(arr);
            });
    }, []);

    return !isAdmin
        ? (
            <NotLoggedIn />
        )
        : (
            <div>
                <Emails emails={emails} />
                <EmailNotSent open={open} setOpen={setOpen} message={message} setMessage={setMessage} />
            </div>
        );
}

export default Email;
