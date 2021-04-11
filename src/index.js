import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "antd/dist/antd.css";
import "./index.css";

import App from "./pages/App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
