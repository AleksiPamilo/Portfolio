import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDocs, collection, query, where, deleteDoc } from "firebase/firestore";
import { Iemail } from "../../../../Interfaces/contact";

import FirebaseServices from "../../../../firebase/firebaseServices";
import Emails from "./Emails";
import EmailNotSent from "../../../popups/emailNotSent";
import NotLoggedIn from "../../../Management/NotLoggedIn";

const db = FirebaseServices.getFirestoreInstance();
const authInstance = FirebaseServices.getAuthInstance();

const Email: React.FC = () => {
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
            .then((snapshot) => {
                const arr: any = [];

                snapshot.forEach((doc) => {
                    arr.push(doc.data());
                });

                console.log(arr)
                setEmails(arr);
            });
    }, []);

    const deleteMail = (email: Iemail) => {
        const q = query(collection(db, "contact"), where("id", "==", email.id));

        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                    deleteDoc(doc(db, "contact", document.id))
                        .catch(() => { setMessage("Email was not deleted due to an error."); setOpen(true); });
                });
            });
    }

    return !isAdmin
        ? (
            <NotLoggedIn />
        )
        : (
            <div>
                <Emails emails={emails} deleteMail={deleteMail} />
                <EmailNotSent open={open} setOpen={setOpen} message={message} setMessage={setMessage} />
            </div>
        );
}

export default Email;
