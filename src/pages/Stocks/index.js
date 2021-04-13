import React, { useState, useEffect } from "react";
import { Input, Alert } from "antd";

import { useApi } from "../../hooks/useApi";
import { fetchSymbolsList } from "../../services/requests";
import StockList from "../../components/StockList";
import Chart from "../../components/Chart";
import styles from "./styles.module.scss";

const Stocks = () => {
    const [data, isLoading, error] = useApi(fetchSymbolsList);
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState();

    useEffect(() => {
        const queryUpper = query?.toUpperCase();
        const filteredResults = data?.filter((item, index) => {
            return (
                item.symbol.includes(queryUpper) ||
                item.name?.toUpperCase().includes(queryUpper)
            );
        });
        setFilteredData(filteredResults);
    }, [query, data]);

    const handleChange = (e) => setQuery(e.target.value?.toUpperCase());

    if (error) {
        const errorMessage = JSON.stringify(error?.response?.data);
        return (
            <div>
                <Alert
                    message="Error"
                    description={errorMessage}
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className={styles.Stocks}>
            <div>
                <Input.Search
                    size="large"
                    placeholder="Symbol/Name"
                    enterButton
                    onChange={handleChange}
                    value={query}
                    loading={isLoading}
                />
                <StockList list={filteredData} isLoading={isLoading} />
            </div>
            <div>
                <Chart />
            </div>
        </div>
    );
};

export default Stocks;
