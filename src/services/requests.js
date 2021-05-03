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
        const { data } = await get("/api/v3/stock_news?limit=50");
        return data;
    } catch (err) {
        throw err;
    }
};

export const fetchDailyHistoricalPrice = async (symbol, dateFrom, dateTo) => {
    try {
        const { data } = await get(
            `/api/v3/historical-price-full/${symbol}?from=${dateFrom}&to=${dateTo}`
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
