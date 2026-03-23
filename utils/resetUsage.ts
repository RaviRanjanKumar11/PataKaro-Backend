import cron from "node-cron";
import User from "../models/User";

cron.schedule("0 0 * * *", async () => {
  await User.updateMany({}, { usage: 0 });
  console.log("API usage reset");
});

export default cron;