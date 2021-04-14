import React from "react";

import Filter from "../../components/Filter";
import styles from "./styles.module.scss";

const Screener = () => {
    return (
        <div className={styles.Screener}>
            <Filter />
        </div>
    );
};

export default Screener;
