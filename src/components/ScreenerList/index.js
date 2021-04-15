import React from "react";
import { Table } from "antd";

import { useApi } from "../../hooks/useApi";
import { stockScreener } from "../../services/requests";
import styles from "./styles.module.scss";

const ScreenerList = ({ filter }) => {
    const [data] = useApi(stockScreener, filter);
    console.log(data, "data");

    const columns = [
        {
            title: "Symbol",
            dataIndex: "symbol",
            key: "symbol",
        },
        {
            title: "Name",
            dataIndex: "companyName",
            key: "companyName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Sector",
            dataIndex: "sector",
            key: "sector",
        },
        {
            title: "Industry",
            dataIndex: "industry",
            key: "industry",
        },
        {
            title: "Volume",
            dataIndex: "volume",
            key: "volume",
        },
        {
            title: "Exchange",
            dataIndex: "exchangeShortName",
            key: "exchangeShortName",
        },
    ];

    return (
        <div className={styles.screenList}>
            <Table
                dataSource={data}
                columns={columns}
                bordered
                scroll={{ y: "100vw" }}
                pagination={{
                    defaultPageSize: 50,
                    position: ["topRight"],
                    responsive: true,
                    showSizeChanger: true,
                    pageSizeOptions: [20, 50, 100],
                    showLessItems: true,
                }}
            />
        </div>
    );
};

export default ScreenerList;
