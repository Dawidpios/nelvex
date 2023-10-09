"use client";
import {
  useState,
  useContext,
  createContext,
} from "react";


type Global = {
  userPlayground: string;
  setUserPlayground: (userPlayground: string) => void;
};

export const GlobalContext = createContext<Global | null>(null);

export default function ContextProvider({ children }: any) {
  const [userPlayground, setUserPlayground] = useState('profile');
  return (
    <GlobalContext.Provider value={{ userPlayground, setUserPlayground }}>
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
