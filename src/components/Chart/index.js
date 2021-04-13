import React, { useContext, useEffect } from "react";
import ApexChart from "react-apexcharts";

import { StoreContext } from "../../context/StoreContext";
import { useApi } from "../../hooks/useApi";
import { fetchDailyHistoricalPrice } from "../../services/requests";

const Chart = () => {
    const { selectedStock } = useContext(StoreContext);

    const [data, isLoading, error] = useApi(
        fetchDailyHistoricalPrice,
        selectedStock
    );

    const { historical, symbol } = data || {};
    console.log(historical, "historical");

    const formattedOptions =
        historical &&
        historical.length &&
        historical.reverse().map((item) => {
            return [
                new Date(item.date).getTime(),
                item.open,
                item.high,
                item.low,
                item.close,
            ];
        });

    return (
        <ApexChart
            series={[
                {
                    data: formattedOptions,
                },
            ]}
            type="candlestick"
            width={1200}
            height={1000}
            options={{
                title: {
                    text: symbol,
                    align: "left",
                },
                chart: {
                    type: "candlestick",
                    id: "candles",
                },
                xaxis: {
                    type: "datetime",
                },
                yaxis: {
                    tooltip: {
                        enabled: true,
                    },
                },
            }}
        />
    );
};

export default Chart;
