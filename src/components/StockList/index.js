import React, { useContext } from "react";
import { Table } from "antd";

import { StoreContext } from "../../context/StoreContext";
import styles from "./styles.module.scss";

const StockList = ({ list, isLoading }) => {
    const { setSelectedStock } = useContext(StoreContext);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value, stock) => {
                return (
                    <div className={styles.StockCell} key={stock.stockSymbol}>
                        <div className={styles.stockSymbol}>{stock.symbol}</div>
                        <div className={styles.stockName}>{stock.name}</div>
                    </div>
                );
            },
            width: "2rem",
        },
        { title: "Price", dataIndex: "price", key: "price", width: "0.5rem" },
    ];

    const showTotal = () => (
        <p style={{ position: "absolute", left: "0", paddingLeft: "10px" }}>
            Showing <b>{list?.length}</b> stocks
        </p>
    );

    return (
        <div className={styles.StockList}>
            <Table
                dataSource={list}
                scroll={{ y: "100vw" }}
                size="small"
                showSizeChanger={true}
                pagination={{
                    defaultPageSize: 50,
                    position: ["topRight"],
                    showTotal,
                    responsive: true,
                    showSizeChanger: true,
                    pageSizeOptions: [20, 50, 100],
                    showLessItems: true,
                }}
                loading={isLoading}
                tableComponents={{ header: "header" }}
                columns={columns}
                onRow={(record, index) => ({
                    onClick: (event) => setSelectedStock(record.symbol),
                })}
                rowKey={(key) => key.symbol}
            />
        </div>
    );
};

export default StockList;
