import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

import { useApi } from "../../hooks/useApi";
import { stockScreener } from "../../services/requests";
import styles from "./styles.module.scss";

const ScreenerList = ({ filter }) => {
    const [data, isLoading] = useApi(stockScreener, { sector: "" });
    const [filteredData, setFilteredData] = useState([]);
    const { sector } = filter;

    useEffect(() => {
        const filteredData =
            data && data.filter((stock) => stock.sector.includes(sector));
        setFilteredData(filteredData);
    }, [sector, data]);

    const columns = [
        {
            title: "Symbol",
            dataIndex: "symbol",
            key: "symbol",
            render: (value) => <Link to={`/stocks/${value}`}>{value}</Link>,
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
                dataSource={filteredData}
                columns={columns}
                bordered
                scroll={{ y: "100vw" }}
                pagination={{
                    defaultPageSize: 50,
                    position: ["topCenter"],
                    responsive: true,
                    showSizeChanger: true,
                    pageSizeOptions: [20, 50, 100],
                    showLessItems: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                }}
                loading={isLoading}
                size="small"
            />
        </div>
    );
};

export default ScreenerList;
