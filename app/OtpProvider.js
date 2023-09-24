'use client'
import { createContext, useState } from 'react';

export const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
    if (typeof window !== "undefined") {
        // Your client-side code here        
        const [details, setDetails] = useState({}); // Provide an initial value as an empty object

        return (
            <OtpContext.Provider value={{ details, setDetails }}>
                {children}
            </OtpContext.Provider>
        );
    }
};
