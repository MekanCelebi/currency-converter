import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// Create the readline interface using input and output streams
const rl = readline.createInterface({ input, output });

// Main function to fetch rates from the API and perform the conversion
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    try {
        // Convert input currency codes to uppercase to handle lowercase inputs
        const from = fromCurrency.toUpperCase();
        const to = toCurrency.toUpperCase();

        // Step 1: Send asynchronous request to the API
        const res = await fetch("https://open.er-api.com/v6/latest/" + from);

        // Step 2: Validate the HTTP response (handles server or network errors)
        if (!res.ok) {
            throw new Error("Invalid base currency!");
        }

        // Step 3: Parse the raw response body into a JavaScript object
        const data = await res.json();

        // Step 4: Validate application-level response (handles invalid base currency codes)
        if (data.result === "error") {
            throw new Error("Invalid base currency!");
        }

        // Step 5: Check if the target currency exists in the fetched rates
        const currentRate = data.rates[to];
        if (!currentRate) {
            throw new Error("Invalid target currency!");
        }

        // Step 6: Perform the calculation and format the result to 2 decimal places
        const result = currentRate * amount;
        console.log(`${amount} ${from} = ${result.toFixed(2)} ${to}`);

    }
    catch (error) {
        // Log any caught errors cleanly to the console
        console.log("❌ Error:", error.message);
    }
};

// Application entry point to handle user interactions
const startApp = async () => {
    try {
        // Prompt the user for input parameters
        const fromCurrencyInput = await rl.question("Enter base currency (e.g. USD): ");
        const toCurrencyInput = await rl.question("Enter target currency (e.g. TRY): ");
        const amountInput = await rl.question("Enter amount (e.g. 100): ");

        // Call the currency conversion logic and wait for it to complete
        await convertCurrency(fromCurrencyInput, toCurrencyInput, amountInput);

    } catch (error) {
        console.log("❌ App Error:", error.message);
    } finally {
        // Always close the readline interface to free up terminal resources
        rl.close();
    }
};

// Start the application
startApp();