import React from "react";
import { Row, Col, Divider } from "antd";

import styles from "./styles.module.scss";

const Filter = () => {
    return (
        <div className={styles.Filter}>
            <div className={styles.Header}>
                <div>Screener</div>
            </div>
            <div className={styles.Content}>
                <div className={styles.SectorFilter}>
                    <div class="jss680">Market</div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
