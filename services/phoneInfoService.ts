import axios from "axios";

// Phone Number Info (Requires API Key - using placeholder for APILayer)

export const getPhoneInfo = async (number: string, apiKey: string) => {
  const response = await axios.get(`https://api.apilayer.com/number_verification/validate?number=${number}`, {
    headers: { 'apikey': apiKey }
  });
  return response.data;
};