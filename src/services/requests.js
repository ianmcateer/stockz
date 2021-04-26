import { get } from "./axios-client";

export const fetchSymbolsList = async () => {
    try {
        const { data } = await get("/api/v3/stock/list");
        return data;
    } catch (err) {
        throw err;
    }
};

export const fetchNews = async () => {
    try {
        const { data } = await get(
            "/api/v3/stock_news?limit=50&apikey=cb1c3b37310830c9de970146f360d642"
        );
        return data;
    } catch (err) {
        throw err;
    }
};

// https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=2018-03-12&to=2019-03-12&apikey=6a985c42e4c6271ff1b26fff1108f806
export const fetchDailyHistoricalPrice = async (symbol, from, to) => {
    try {
        const { data } = await get(
            `/api/v3/historical-price-full/${symbol}?from=2021-01-07&to=2021-03-12`
        );
        return data;
    } catch (err) {
        console.log(err, "err");
    }
};

export const stockScreener = async (params) => {
    const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

    try {
        const { data } = await get(`/api/v3/stock-screener?${queryString}`);
        return data;
    } catch (err) {
        console.log(err);
    }
};
