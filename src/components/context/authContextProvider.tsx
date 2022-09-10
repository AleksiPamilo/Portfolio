import React, { useState, useEffect } from "react";
import FirebaseServices from "../../firebase/firebaseServices";
import Login from "../../sites/Management/Login";
import NotFound from "../../sites/NotFound";

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

    useEffect(() => checkLogin(), []);

    const checkLogin = () => {
        setAuthIsLoading(true);
        authInstance.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setAuthIsLoading(false);
        });
    }

    const handleLogout = () => {
        authInstance.signOut();
        setIsLoggedIn(false);
        window.location.reload();
    }

    if (authIsLoading) {
        return <div className="pt-[20rem] w-full flex justify-center items-center">Loading...</div>
    } else {
        return (
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
                        ? children
                        : window.location.pathname.includes("/management")
                            ? <Login />
                            : <NotFound />
                }
            </AuthContext.Provider>
        )
    }
}

export {
    AuthContextProvider,
    useAuthContext
};