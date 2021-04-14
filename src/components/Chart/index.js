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

    const formattedOptions =
        historical &&
        historical.length &&
        historical.reverse().map((item) => {
            return { x: new Date(item.date).getTime(), y: item.close };
            // return [
            //     new Date(item.date).getTime(),
            //     item.open,
            //     item.high,
            //     item.low,
            //     item.close,
            // ];
        });

    return (
        <ApexChart
            series={[
                {
                    data: formattedOptions,
                },
            ]}
            height={500}
            type="area"
            options={{
                chart: {
                    type: "area",
                    zoom: {
                        enabled: true,
                    },
                    toolbar: {
                        autoSelected: "pan",
                        show: true,
                    },
                },

                title: {
                    text: symbol,
                    align: "left",
                },
                subtitle: {
                    text: "Price Movements",
                    align: "left",
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "straight",
                    width: 2,
                },
                xaxis: {
                    type: "datetime",
                },
                yaxis: {
                    opposite: true,
                },
                legend: {
                    horizontalAlign: "left",
                },
            }}
        />
    );
};

export default Chart;
