"use client";
import {
  useState,
  useContext,
  createContext,
} from "react";

type Global = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
};

export const GlobalContext = createContext<Global | null>(null);

export default function ThemeProvider({ children }: any) {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <GlobalContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error("Global context must be used inside GlobalContextProvider");
  }
  return ctx;
};
