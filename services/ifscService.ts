import axios from "axios";

export const fetchIfscDetails = async (ifsc: string) => {

  const response = await axios.get(
    `https://ifsc.razorpay.com/${ifsc.toUpperCase()}`
  );

  return response.data;
};


