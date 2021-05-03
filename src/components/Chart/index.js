import React, { useContext, useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import moment from "moment";

import { StoreContext } from "../../context/StoreContext";
import { useApi } from "../../hooks/useApi";
import { fetchDailyHistoricalPrice } from "../../services/requests";
import { DatePicker, Spin, Table } from "antd";

import styles from "./styles.module.scss";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const Chart = () => {
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();

    const { selectedStock } = useContext(StoreContext);
    const [priceSeries, setPriceSeries] = useState([]);
    const [dateRange, setDateRange] = useState(["2018-03-12", "2021-03-12"]);

    const [dateFrom, dateTo] = dateRange;

    const [data, isLoading] = useApi(
        fetchDailyHistoricalPrice,
        selectedStock,
        dateFrom,
        dateTo
    );

    useEffect(() => {
        if (!data) return;

        if (document.getElementById("chart") !== null) {
            document.getElementById("chart").innerHTML = "";
        }

        if (!chartContainerRef.current) return;

        chart.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                backgroundColor: "#253248",
                textColor: "rgba(255, 255, 255, 0.9)",
            },
            grid: {
                vertLines: {
                    color: "#334158",
                },
                horzLines: {
                    color: "#334158",
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            priceScale: {
                autoScale: true,
                borderColor: "#485c7b",
            },
            timeScale: {
                autoScale: true,
                borderColor: "#485c7b",
            },
        });

        const priceData = [];

        data &&
            data.historical &&
            data.historical.reverse().forEach((stock) => {
                priceData.push({
                    time: moment(stock.date).format(),
                    open: stock.open,
                    high: stock.high,
                    low: stock.low,
                    close: stock.close,
                });
            });

        setPriceSeries(priceData);

        const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#4bffb5",
            downColor: "#ff4976",
            borderDownColor: "#ff4976",
            borderUpColor: "#4bffb5",
            wickDownColor: "#838ca1",
            wickUpColor: "#838ca1",
        });

        candleSeries.setData(priceData || []);
    }, [data]);

    // Resize chart on container resizes.
    useEffect(() => {
        if (!data) return;

        resizeObserver.current = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            chart.current.applyOptions({ width, height });
            setTimeout(() => {
                chart.current.timeScale().fitContent();
            }, 0);
        });

        resizeObserver.current.observe(chartContainerRef.current);

        return () =>
            resizeObserver.current && resizeObserver.current.disconnect();
    }, [data, dateRange]);

    const columns = [
        {
            title: "Date",
            dataIndex: "label",
            key: "label",
            render: (value) => {
                return <p>{value}</p>;
            },
        },
        {
            title: "Open",
            dataIndex: "open",
            key: "open",
        },
        {
            title: "High",
            dataIndex: "high",
            key: "high",
        },
        {
            title: "Low",
            dataIndex: "low",
            key: "low",
            render: (value) => {
                return <p>{value}</p>;
            },
        },
        {
            title: "Close",
            dataIndex: "close",
            key: "close",
            render: (value) => {
                return <p>{value}</p>;
            },
        },
    ];

    return (
        <div className={styles.Chart}>
            <h1>
                {selectedStock} Chart {isLoading && <Spin size="default" />}
            </h1>
            <div className={styles.datePicker}>
                <RangePicker
                    bordered
                    onChange={(_momentDate, dateString) => {
                        setDateRange([...dateString]);
                    }}
                    value={[
                        moment(dateFrom, dateFormat),
                        moment(dateTo, dateFormat),
                    ]}
                />
            </div>
            {priceSeries && (
                <>
                    <div
                        ref={chartContainerRef}
                        className={isLoading ? styles.loadingChart : ""}
                        style={{ height: "50%" }}
                        id="chart"
                    />
                    <Table
                        dataSource={data && data.historical}
                        columns={columns}
                        bordered
                        scroll={{ y: 350 }}
                        size="small"
                        loading={isLoading}
                        rowKey={(record) => record.label}
                        pagination={{
                            pageSize: 100,
                            hideOnSinglePage: true,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default Chart;
