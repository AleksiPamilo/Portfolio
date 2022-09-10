import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseServices from "../../firebase/firebaseServices";
import { useAuthContext } from "../../components/context/authContextProvider";
import Input from "../../components/Input";

const authInstance = FirebaseServices.getAuthInstance();

const Login: React.FC = () => {
    const { setIsLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = () => {
        if (email === "" || password === "") {
            setError("Please fill all the fields");
            return;
        } else if (validateEmail(email) === false) {
            setError("Please enter a valid email");
            return;
        } else {
            setLoading(true);

            signInWithEmailAndPassword(authInstance, email, password)
                .then(() => {
                    setEmail("");
                    setPassword("");
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    setError("Invalid email or password");
                });
        }

    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                user.getIdTokenResult()
                    .then((idTokenResult) => {
                        setIsLoggedIn(!!idTokenResult.claims.admin);
                    })
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    });

    return (
        <div className="flex w-screen h-screen absolute backdrop-blur-sm justify-center items-center">
            <div className="w-[25rem] md:w-[40rem] rounded-lg bg-gray-300 p-4 border-2 border-cyan-600" onClick={e => e.stopPropagation()}>
                <div className="align-middle">
                    <div className="float-left">
                        <h1 className="text-black font-bold text-xl pl-1 select-none">Log In to Management Dashboard.</h1>
                    </div>
                    <div className="float-right">
                        <button className="py-2 px-3 mr-1 rounded-md text-white bg-cyan-600 hover:bg-cyan-700 select-none" onClick={() => navigate("/", {
                            replace: true
                        })}>
                            <span>Back to Portfolio</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="mt-12 grid grid-col gap-1">
                        <Input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(String(e.target.value))} required={!!error && email === ""} />
                        <Input type="password" placeholder="Your Password" value={password} onChange={e => setPassword(String(e.target.value))} required={!!error && password === ""} />
                    </div>
                    <div className="py-1">
                        <div className="float-left" hidden={!!!error}>
                            <div className="flex items-center w-full max-w-[29.3rem] h-10 px-4 rounded-lg border-2 text-red-600 bg-white border-red-500">
                                {error}
                            </div>
                        </div>
                        <div className="float-right">
                            <button className="w-[8rem] h-10 rounded-md mr-1 text-white font-bold bg-cyan-600 hover:bg-cyan-700" onClick={handleLogin} >
                                {loading ? <p className="inline">Logging in...</p> : <p className="inline">Log in</p>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export default Login;
