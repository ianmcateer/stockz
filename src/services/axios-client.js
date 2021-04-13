import axios from "axios";
import { financialModellingPrepConfig } from "../config";

let apiKeysLength = financialModellingPrepConfig.apiKeys.length;

const ERRORS = {
    NO_KEYS: "There are no api keys",
    NO_KEYS_LEFT: "All available api keys have been used",
};

const axiosClient = axios.create({
    baseURL: financialModellingPrepConfig.baseUrl,
    params: {
        apikey: financialModellingPrepConfig.apiKeys[0],
    },
    timeout: 30000,
});

axiosClient.interceptors.request.use((config) => {
    if (apiKeysLength === 0) {
        throw new Error(ERRORS.NO_KEYS);
    }
    if (!config.params.apikey) {
        throw new Error(ERRORS.NO_KEYS_LEFT);
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (
            response &&
            response.data["Error Message"] &&
            response.data["Error Message"].includes("Invalid API KEY")
        ) {
            const currentApiKey = response.config.params.apikey;
            const currentApiKeyIndex = financialModellingPrepConfig.apiKeys.indexOf(
                currentApiKey
            );

            // If ran out of apiKeys throw axios error
            if (response.config.apiKeyIndex >= apiKeysLength - 1) {
                throw new Error(ERRORS.NO_KEYS_LEFT);
            }

            const originalRequest = response.config;
            originalRequest._retry = true;

            // Set the new apikey using +1 element in array
            response.config.params.apikey =
                financialModellingPrepConfig.apiKeys[currentApiKeyIndex + 1];

            return axiosClient(originalRequest);
        }

        return response;
    },
    (error) => {
        if (error && error.response && error.response.data["Error Message"]) {
            const currentApiKey = error.response.config.params.apikey;
            const currentApiKeyIndex = financialModellingPrepConfig.apiKeys.indexOf(
                currentApiKey
            );

            // If API key used up all requests
            if (error.response.config.apiKeyIndex >= apiKeysLength - 1) {
                throw new Error(ERRORS.NO_KEYS_LEFT);
            }

            const originalRequest = error.response.config;
            originalRequest._retry = true;

            // Set the new apikey using +1 element in array
            error.response.config.params.apikey =
                financialModellingPrepConfig.apiKeys[currentApiKeyIndex + 1];

            return axiosClient(originalRequest);
        }

        return error;
    }
);

export const get = async (path, config) => {
    return await axiosClient.get(path, config);
};
