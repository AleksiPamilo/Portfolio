import React, { createContext, useContext, useState, useEffect } from 'react';

interface IDarkmodeContext {
    isDarkmode: boolean;
    setIsDarkmode: React.Dispatch<React.SetStateAction<boolean>>
}

interface Props {
    children: React.ReactNode;
}

const DarkmodeContext = createContext<IDarkmodeContext | undefined>(undefined);

const useDarkmodeContext = () => {
    const context = useContext(DarkmodeContext);

    if (context === undefined) {
        throw new Error('Call "useDarkmodeContext" only inside a DarkmodeContextProvider');
    }

    return context;
}

const DarkmodeContextProvider: React.FC<Props> = ({ children }) => {
    const [isDarkmode, setIsDarkmode] = useState<boolean>(JSON.parse(localStorage.getItem('useDarkmode') ?? "true"));

    useEffect(() => {
        document.body.classList.toggle("dark", isDarkmode);
        document.body.classList.toggle("light", !isDarkmode);
    }, [isDarkmode]);

    return (
        <DarkmodeContext.Provider value={{ isDarkmode, setIsDarkmode }}>
            {children}
        </DarkmodeContext.Provider>
    )
}

export { DarkmodeContextProvider, useDarkmodeContext as useDarkmode };