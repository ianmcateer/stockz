import React, { useContext, useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import moment from "moment";

import { StoreContext } from "../../context/StoreContext";
import { useApi } from "../../hooks/useApi";
import { fetchDailyHistoricalPrice } from "../../services/requests";

import styles from "./styles.module.scss";

const Chart = () => {
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();

    const { selectedStock } = useContext(StoreContext);

    const [data, isLoading, error] = useApi(
        fetchDailyHistoricalPrice,
        selectedStock
    );

    useEffect(() => {
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
                borderColor: "#485c7b",
            },
            timeScale: {
                borderColor: "#485c7b",
            },
        });

        const priceData =
            data &&
            data.historical &&
            data.historical.reverse().map((stock) => {
                return {
                    time: moment(stock.date).format("YYYY-MM-DD"),
                    open: stock.open,
                    high: stock.high,
                    low: stock.low,
                    close: stock.close,
                };
            });

        const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#4bffb5",
            downColor: "#ff4976",
            borderDownColor: "#ff4976",
            borderUpColor: "#4bffb5",
            wickDownColor: "#838ca1",
            wickUpColor: "#838ca1",
        });

        candleSeries.setData(priceData || []);

        // const areaSeries = chart.current.addAreaSeries({
        //   topColor: 'rgba(38,198,218, 0.56)',
        //   bottomColor: 'rgba(38,198,218, 0.04)',
        //   lineColor: 'rgba(38,198,218, 1)',
        //   lineWidth: 2
        // });

        // areaSeries.setData(areaData);

        // const volumeSeries = chart.current.addHistogramSeries({
        //     color: "#182233",
        //     lineWidth: 2,
        //     priceFormat: {
        //         type: "volume",
        //     },
        //     overlay: true,
        //     scaleMargins: {
        //         top: 0.8,
        //         bottom: 0,
        //     },
        // });

        // volumeSeries.setData(volumeData);
    }, [data]);

    // Resize chart on container resizes.
    // useEffect(() => {
    //     resizeObserver.current = new ResizeObserver((entries) => {
    //         const { width, height } = entries[0].contentRect;
    //         chart.current.applyOptions({ width, height });
    //         setTimeout(() => {
    //             chart.current.timeScale().fitContent();
    //         }, 0);
    //     });

    //     resizeObserver.current.observe(chartContainerRef.current);

    //     return () => resizeObserver.current.disconnect();
    // }, [data]);

    return (
        <div className={styles.Chart}>
            <div
                ref={chartContainerRef}
                className="chart-container"
                style={{ height: "100%" }}
            />
        </div>
    );
};

export default Chart;
