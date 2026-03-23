import express from "express";
import { apiLimiter } from "../middleware/rateLimiter";
import { apiKeyAuth, getCurrentUser } from "../middleware/apiKeyAuth";
import {
  getIfscDetails,
  getPincodeDetails,
  getIpInfo,
  getExchangeRates,
  getWeather,
  getPhoneInfo,
  getGstDetails,
  getCompanyDetails,
  generateQrCode,   
  shortenUrl,
  getRandomUser,
    getCryptoPrices
} from "../controllers/apiController";

const router = express.Router();
router.use(apiLimiter);
router.get("/me", getCurrentUser);
router.get("/ifsc",apiKeyAuth, getIfscDetails);
router.get("/pincode",apiKeyAuth, getPincodeDetails);
router.get("/ip",apiKeyAuth, getIpInfo);
router.get("/exchange",apiKeyAuth, getExchangeRates);
router.get("/weather",apiKeyAuth, getWeather);
router.get("/phone",apiKeyAuth, getPhoneInfo);
router.get("/gst",apiKeyAuth, getGstDetails);
router.get("/company",apiKeyAuth, getCompanyDetails);
router.get("/qr",apiKeyAuth, generateQrCode);
router.get("/shorten",apiKeyAuth, shortenUrl);
router.get("/random-user",apiKeyAuth, getRandomUser);
router.get("/crypto",apiKeyAuth, getCryptoPrices);

export default router;