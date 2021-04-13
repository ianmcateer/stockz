import React from "react";

import { format } from "d3-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const CandleStickChart = ({
    type = "hybrid",
    data: initialData,
    width,
    ratio,
}) => {
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
        (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } =
        xScaleProvider(initialData) || {};

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [start, end];

    const height = 1000;

    return (
        <ChartCanvas
            height={height}
            ratio={ratio}
            width={width}
            margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
            type={type}
            seriesName="MSFT"
            data={initialData}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            xExtents={xExtents}
        >
            <Chart id={1} yExtents={(d) => [d.high, d.low]}>
                <XAxis axisAt="bottom" orient="bottom" />
                <YAxis axisAt="right" orient="right" ticks={5} />
                <CandlestickSeries />
            </Chart>
            {/* <Chart
                id={2}
                origin={(w, h) => [0, h - height / 3]}
                height={height / 3}
                yExtents={(d) => d.volume}
            >
                <XAxis axisAt="bottom" orient="bottom" />
                <YAxis
                    axisAt="left"
                    orient="left"
                    ticks={5}
                    tickFormat={format(".2s")}
                />
                <BarSeries
                    yAccessor={(d) => d.volume}
                    fill={(d) => (d.close > d.open ? "#6BA583" : "red")}
                />
            </Chart> */}
        </ChartCanvas>
    );
};

export default fitWidth(CandleStickChart);
