import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${today}/v1/currencies/${currency}.json`
        )
            .then((res) => res.json())
            .then((res) => setData(res[currency]));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;