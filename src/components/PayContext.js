// PayContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const PayContext = createContext();

export function PayProvider({ children }) {
    const [payData, setPayData] = useState({
        paymentType: 'creditCard',
        cardNumber: '',
        cvv: '',
        expirationDate: '',
        cardHolder: '',
    });

    const addPayData = (newData) => {
        setPayData((prev) => ({ ...prev, ...newData })); // Merge new data into the existing object
    };

    return (
        <PayContext.Provider value={{ payData, setPayData, addPayData }}>
            {children}
        </PayContext.Provider>
    );
}

export const usePayData = () => useContext(PayContext);