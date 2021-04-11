import React, { useState, useEffect } from "react";
import { Pagination, Table, Tag, Space } from "antd";

const StockList = ({ list }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const [pageSize, setPageSize] = useState(200);
    const [currentPageElements, setCurrentPageElements] = useState(null);

    useEffect(() => {
        const elements =
            list && list.length && list.slice(offset, offset + pageSize);
        setCurrentPageElements(elements);
    }, [list, pageSize, currentPage, offset]);

    useEffect(() => {
        setCurrentPage(1);
        setOffset(0);
    }, [list]);

    const handleChange = (page) => {
        console.log(page, "page");
        const offsetNumber = (page - 1) * pageSize;
        setOffset(offsetNumber);
        setCurrentPage(page);
    };

    const columns = [
        { title: "Symbol", dataIndex: "symbol" },
        { title: "Name", dataIndex: "name" },
        { title: "Price", dataIndex: "price" },
    ];

    return (
        <div>
            <Table
                dataSource={list}
                columns={columns}
                pagination={{ position: ["topRight", "bottomRight"] }}
                scroll
                size="small"
            />
        </div>
    );
};

export default StockList;
