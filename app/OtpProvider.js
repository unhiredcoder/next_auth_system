'use client'
import { createContext, useState } from 'react';

export const OtpContext = createContext();
export const OtpProvider = ({ children }) => {
    const [details, setDetails] = useState('');

    return (
        <OtpContext.Provider value={{ details, setDetails }}>
            {children}
        </OtpContext.Provider>
    );
};
