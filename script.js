// script.js
const BASE_URL =
  "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json"; // Example API URL
const dropdowns = document.querySelectorAll("select");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const currencyList = {
  USD: 1,
  PKR: 277.54,
  GBP: 0.76,
  JPY: 151.61,
  EUR: 0.92,
  INR: 83.3,
  CNY: 7.3,
  RUB: 92.58,
};

function populateDropdowns() {
  dropdowns.forEach((select) => {
    for (let currency in currencyList) {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      select.add(option);
    }
  });
}

async function convertCurrency() {
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;
  const amount = document.getElementById("amount").value;

  if (fromCurrency === toCurrency) {
    result.textContent = `Please choose different currencies!`;
    return;
  }

  try {
    let response = await fetch(BASE_URL);
    let data = await response.json();

    // Fetch the conversion rates (for example sake using mock data)
    const fromRate = currencyList[fromCurrency];
    const toRate = currencyList[toCurrency];

    // Calculate converted amount
    const convertedAmount = (amount / fromRate) * toRate;

    result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
      2
    )} ${toCurrency}`;
  } catch (error) {
    result.textContent = "Error fetching data. Please try again.";
    console.error(error);
  }
}

// Populate the dropdowns with currency codes
populateDropdowns();

// Add event listener to the convert button
convertBtn.addEventListener("click", convertCurrency);
