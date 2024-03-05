
"use client"
import React, { useContext, useState, FC, ReactNode } from 'react';

// Define the shape of the context data
interface ParamsContextType {
  lang: string;
  setLang: (lang: string) => void;
}

// Create the context with a default undefined value for context
export const ParamsContext = React.createContext<ParamsContextType | undefined>(undefined);

// Define a custom hook to use the context
export const useParams = (): ParamsContextType => {
  const context = useContext(ParamsContext);
  if (!context) {
    throw new Error('useParams must be used within a ParamsProvider');
  }
  return context;
};

interface ParamsProviderProps {
  children: ReactNode; // Define the type for children
}

// Provide the context using a provider component
export const ParamsProvider: FC<ParamsProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<string>('en'); // Set an initial language, for example, 'en'

  const value = { lang, setLang };

  return <ParamsContext.Provider value={value}>{children}</ParamsContext.Provider>;
};
