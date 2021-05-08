import React, { useState } from "react";

import Filter from "../../components/Filter";
import ScreenerList from "../../components/ScreenerList";
import styles from "./styles.module.scss";

const Screener = () => {
    const [filter, setFilter] = useState({ sector: "" });

    return (
        <div className={styles.Screener}>
            <Filter setFilter={setFilter} filter={filter} />
            <ScreenerList filter={filter} />
        </div>
    );
};

export default Screener;
