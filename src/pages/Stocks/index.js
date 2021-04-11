import React, { useState, useEffect, useCallback } from "react";
import { Input, AutoComplete } from "antd";
import { debounce } from "lodash";

import { useApi } from "../../hooks/useApi";
import { fetchSymbolsList } from "../../services/requests";
import StockList from "../../components/StockList";

import styles from "./styles.module.scss";

const Stocks = () => {
    const [data, isLoading, error] = useApi(fetchSymbolsList);
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState();
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        const filteredResults = data?.filter((item, index) => {
            return (
                item.symbol.includes(query) ||
                item.name.toUpperCase().includes(query)
            );
        });
        setFilteredData(filteredResults);
    }, [query, data, selectedItem]);

    useEffect(() => {
        if (selectedItem) {
            const filteredResults = data?.find((item, index) => {
                return item.symbol === selectedItem;
            });
            setFilteredData([filteredResults]);
        }
    }, [selectedItem]);

    const handleSearch = useCallback(
        debounce((query) => {
            setQuery(query.toUpperCase());
        }, 280),
        [query]
    );

    const onSelect = (value) => {
        setSelectedItem(value);
    };

    const filteredOptions =
        filteredData &&
        Array.from(filteredData, (item) => ({
            label: (
                <div className={styles.SearchResult}>
                    <span>{item.symbol}</span>
                    <span>{item.name}</span>
                </div>
            ),
            value: item.symbol,
        }));

    return (
        <div className={styles.Stocks}>
            <AutoComplete
                options={filteredOptions}
                onSearch={handleSearch}
                onSelect={onSelect}
                disabled={isLoading}
                style={{ width: "100%", display: "block" }}
            >
                <Input.Search
                    size="large"
                    placeholder="Symbol/Name"
                    enterButton
                />
            </AutoComplete>
            <StockList list={filteredData} />
        </div>
    );
};

export default Stocks;
