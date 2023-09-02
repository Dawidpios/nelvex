'use client'
import { useState, useContext, createContext, SetStateAction, Dispatch } from 'react'


 
export const ThemeContext = createContext({})
 
export default function ThemeProvider({ children }:any) {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  return <ThemeContext.Provider value={{isLogged, setIsLogged}}>{children}</ThemeContext.Provider>
}

export const useGlobalContext = () => useContext(ThemeContext)