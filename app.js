const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    try {
        const res = await fetch("https://open.er-api.com/v6/latest/" + fromCurrency);
        const data = await res.json();
        const currentRate = data.rates[toCurrency];
        const result = currentRate * amount;
        console.log(`${amount} ${fromCurrency} = ${result.toFixed(2)}  ${toCurrency}`);

    }
    catch (error) {
        console.log("❌ Error:", error.message);
    }
};
convertCurrency("USD", "TRY", "10");