import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
    const [selectedStock] = useState(null);

    const setSelectedStock = (stock) => {
        setStore((prevState) => {
            return {
                ...prevState,
                selectedStock: stock,
            };
        });
    };

    const [store, setStore] = useState({
        selectedStock,
        setSelectedStock,
    });

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
