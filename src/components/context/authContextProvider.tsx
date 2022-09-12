import React, { useState, useEffect, useCallback } from "react";
import { HiLogout } from "react-icons/hi";
import FirebaseServices from "../../firebase/firebaseServices";
import Login from "../../sites/Management/Login";

const authInstance = FirebaseServices.getAuthInstance();

interface IAuthContext {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    checkLogin: () => void,
    setAuthIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    authIsLoading: boolean,
    handleLogout: () => void,
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
export default AuthContext;

const useAuthContext = () => {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error('Call "useAuthContext" only inside AuthContextProvider');
    }

    return context;
}

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [authIsLoading, setAuthIsLoading] = useState<boolean>(true);

    const checkLogin = useCallback(() => {
        setAuthIsLoading(true);
        authInstance.onAuthStateChanged((user) => {
            if (user) {
                user.getIdTokenResult().then((idTokenResult) => {
                    if (idTokenResult.claims.admin) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                });
            } else {
                setIsLoggedIn(false);
                setAuthIsLoading(false);
            }
            setAuthIsLoading(false);
        });
    }, []);

    useEffect(() => checkLogin(), [checkLogin]);

    const handleLogout = () => {
        authInstance.signOut();
        setIsLoggedIn(false);
        window.location.reload();
    }

    if (authIsLoading) return <div>Loading...</div>
    else return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            authIsLoading: authIsLoading,
            setIsLoggedIn: setIsLoggedIn,
            checkLogin: checkLogin,
            setAuthIsLoading: setAuthIsLoading,
            handleLogout: handleLogout
        }}>
            {
                isLoggedIn
                    ? <>
                        <button onClick={handleLogout} className="absolute top-0 right-0 mt-3 mr-[15%] md:mr-[10%] bg-cyan-600 py-2 px-3 rounded-lg"><HiLogout className="w-5 h-5 text-white" /></button>
                        {children}
                    </>
                    : <Login />
            }
        </AuthContext.Provider>
    )
}

export {
    AuthContextProvider,
    useAuthContext as useAuth
};
