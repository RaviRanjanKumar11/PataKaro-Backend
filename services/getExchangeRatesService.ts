import axios from "axios";

// Currency Converter (INR to USD, EUR)
export const getExchangeRates = async () => {
  const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
  return response.data;
};

