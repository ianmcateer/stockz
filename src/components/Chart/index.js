import React, { useContext } from "react";
import { timeParse } from "d3-time-format";

import { StoreContext } from "../../context/StoreContext";
import { useApi } from "../../hooks/useApi";
import { fetchDailyHistoricalPrice } from "../../services/requests";
import CandleStickChart from "../CandleStickChartWithVolume";

import { testObj } from "../CandleStickChartWithVolume/test";

const parseDate = timeParse("%Y-%m-%d");

const Chart = () => {
    const { selectedStock } = useContext(StoreContext);

    const [data, isLoading, error] = useApi(
        fetchDailyHistoricalPrice,
        selectedStock
    );

    const { symbol, historical } = data || {};

    const formattedData = historical
        ?.map((item) => {
            return {
                high: item.high,
                open: item.open,
                low: item.low,
                close: item.close,
                volume: item.volume,
                date: item.date,
            };
        })
        .reverse();

    // formattedData &&
    //     formattedData.length &&
    //     formattedData.push({
    //         columns: [
    //             [
    //                 "date",
    //                 "open",
    //                 "high",
    //                 "low",
    //                 "close",
    //                 "volume",
    //                 "split",
    //                 "dividend",
    //                 "absoluteChange",
    //                 "percentChange",
    //             ],
    //         ],
    //     });

    return <div>{<CandleStickChart data={formattedData} />}</div>;
};

export default Chart;

/* 



adjClose: 50.06
change: -1.48
changeOverTime: -0.02872
changePercent: -2.872
close: 50.06
date: "2018-04-02"
high: 51.72
label: "April 02, 18"
low: 49.56
open: 51.54
unadjustedVolume: 59875500
volume: 59875500
vwap: 50.44667
*/
