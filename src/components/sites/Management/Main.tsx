import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

import "./Main.css";
import LoadingIcons from "react-loading-icons";

import IncorrectLoginData from "../../popups/IncorrectLoginData";
import FirebaseServices from "../../../firebase/firebaseServices";

const authInstance = FirebaseServices.getAuthInstance();

const Management: React.FC = () => {
    document.title = "Portfolio – Management";

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);


    const handleLogin = () => {
        if (!email || !password) return setOpen(true);
        setLoading(true);

        signInWithEmailAndPassword(authInstance, email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setOpen(true);
            });
    };

    const handleLogout = () => {
        const auth = getAuth();

        setLoading(true);

        signOut(auth).then(() => {
            setLoading(false);
            alert("Logged Out Successfully");
        }).catch(() => {
            setLoading(false);
            alert("Logging Out Failed");
        });
    };

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
    });

    return !isAdmin ? (
        <div className="text-center mt-44 md:mt-64">
            <IncorrectLoginData open={open} setOpen={setOpen} />
            <div className="block">
                <div>
                    <input className="w-[20rem] text-black text-center rounded-lg mb-2 shadow-md shadow-black placeholder:text-center" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Käyttäjänimi" />
                </div>
                <div>
                    <input className="w-[20rem] text-black text-center rounded-lg mb-5 shadow-md shadow-black placeholder:text-center" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Salasana" />
                </div>
                <button type="button" className="py-3 bg-cyan-500 rounded-lg w-[20rem] shadow-md shadow-black text-center justify-between space-x-4 disabled:cursor-not-allowed" onClick={() => handleLogin()} disabled={loading}>
                    {loading ? <LoadingIcons.TailSpin className="w-6 h-6 inline" /> : null}
                    {loading ? <p className="inline">Kirjaudutaan...</p> : <p className="inline">Kirjaudu</p>}
                </button>

            </div>
        </div>
    ) : (
        <div>
            <div className="float-right select-none mr-4 mt-2 md:mr-12">
                <button type="button" className="py-3 bg-cyan-500 rounded-lg w-[11rem] shadow-md shadow-black text-center justify-between space-x-4 disabled:cursor-not-allowed" onClick={() => handleLogout()} disabled={loading}>
                    {loading ? <LoadingIcons.TailSpin className="w-6 h-6 inline" /> : null}
                    {loading ? <p className="inline">Kirjaudutaan ulos...</p> : <p className="inline">Kirjaudu Ulos</p>}
                </button>
            </div>

            <div className="text-center pt-64">
                <Link to="/management/cv" className="block text-blue-600 text-2xl font-bold hover:text-blue-500">Edit CV</Link>
                <Link to="/management/email" className="block text-blue-600 text-2xl font-bold hover:text-blue-500 mt-4">Emails</Link>
            </div>

        </div>
    )
}

export default Management;
