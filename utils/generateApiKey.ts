import { v4 as uuidv4 } from "uuid";

export const generateApiKey = () => {

  const random = uuidv4().replace(/-/g, "");

  return `sk_live_${random.substring(0, 24)}`;
};