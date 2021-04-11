import React, { useState, useEffect } from "react";
import { Pagination, Table, Tag, Space } from "antd";

const StockList = ({ list }) => {
    const columns = [
        {
            title: "Symbol",
            dataIndex: "symbol",
            key: "symbol",
            // sorter: (a, b) => a.symbol < b.symbol,
            // sortDirections: ["ascend"],
            defaultSortOrder: "ascend",
        },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Price", dataIndex: "price", key: "price" },
    ];

    return (
        <div>
            <Table
                dataSource={list}
                columns={columns}
                pagination={{ position: ["topRight", "bottomRight"] }}
                scroll={{ y: "100vw" }}
                size="small"
            />
        </div>
    );
};

export default StockList;
