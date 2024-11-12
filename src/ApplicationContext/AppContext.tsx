// src/context/AppContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const AppContext = createContext({});

// Create a Provider component
export const AppProvider = ({ children }) => {
    const [displaySpinner, setDisplaySpinner] = useState(false)
    const toggleSpinner = (isDisplay) => {
        setDisplaySpinner(isDisplay);
    }
    return (
        <AppContext.Provider value={{ toggleSpinner, displaySpinner }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use context in other components
export const useAppContext = () => {
    return useContext(AppContext);
};
