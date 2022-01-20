import React, { createContext, useContext, useState, useEffect } from 'react';

interface IDarkmodeContext {
  useDarkmode: boolean;
  setUseDarkmode: React.Dispatch<React.SetStateAction<boolean>>
}


const DarkmodeContext = createContext<IDarkmodeContext | undefined>(undefined);

const useDarkmodeContext = () => {
  const context = useContext(DarkmodeContext);

  if (context === undefined) {
    throw new Error('Call "useDarkmodeContext" only inside a DarkmodeContextProvider');
  }

  return context;
}

const DarkmodeContextProvider: React.FC = ({ children }) => {

  const [useDarkmode, setUseDarkmode] = useState<boolean>(JSON.parse(localStorage.getItem('useDarkmode') ?? "false"));

  useEffect(() => {
    document.body.classList.toggle("dark", useDarkmode);
    document.body.classList.toggle("light", !useDarkmode);
  }, [useDarkmode]);

  return (
    <DarkmodeContext.Provider value={{ useDarkmode: useDarkmode, setUseDarkmode: setUseDarkmode }}>
      {children}
    </DarkmodeContext.Provider>
  )
}

export { DarkmodeContextProvider, useDarkmodeContext };