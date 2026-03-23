import axios from "axios";

export const fetchIpInfo = async (ip?: string) => {

  const url = ip
    ? `https://ipapi.co/${ip}/json/`
    : `https://ipapi.co/json/`;

  const response = await axios.get(url);

  return response.data;
};