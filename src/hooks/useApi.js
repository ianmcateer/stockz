import { useState } from "react";

import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";

export const useApi = (service, ...options) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const results = await service(...options);
            setData(results);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useDeepCompareEffectNoCheck(() => {
        fetchData();
    }, [...options]);

    return [data, isLoading, error, fetchData];
};
