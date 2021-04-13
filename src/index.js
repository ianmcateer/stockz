import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "antd/dist/antd.css";

import StoreProvider from "./context/StoreContext";
import "./index.css";

import App from "./pages/App";

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
            <App />
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
