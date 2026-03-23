import axios from "axios";

export const fetchPincodeDetails = async (pin: string) => {

  const response = await axios.get(
    `https://api.postalpincode.in/pincode/${pin}`
  );

  return response.data[0];
};