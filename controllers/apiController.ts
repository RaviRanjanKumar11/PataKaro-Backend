import { Request, Response } from "express";
import axios from "axios";

export const getIfscDetails = async (req: Request, res: Response) => {

  try {

    const { ifsc } = req.query;

    if (!ifsc) {
      return res.status(400).json({ error: "IFSC code required" });
    }

    const response = await axios.get(
      `https://ifsc.razorpay.com/${String(ifsc).toUpperCase()}`
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error: "Invalid IFSC or API error"
    });

  }

};  

export const getPincodeDetails = async (req: Request, res: Response) => {

  try {

    const { pin } = req.query;

    if (!pin) {
      return res.status(400).json({ error: "Pincode required" });
    }

    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pin}`
    );

    res.json(response.data[0]);

  } catch (error) {

    res.status(500).json({
      error: "Invalid Pincode"
    });

  }

};


export const getIpInfo = async (req: Request, res: Response) => {

  try {

    const { ip } = req.query;

    const url = ip
      ? `https://ipapi.co/${ip}/json/`
      : `https://ipapi.co/json/`;

    const response = await axios.get(url);

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      error: "IP lookup failed"
    });

  }

};


export const getExchangeRates = async (req: Request, res: Response) => {
  try {

    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/INR"
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: "Exchange rate API failed" });

  }
};

export const getWeather = async (req: Request, res: Response) => {

  try {

    const { city } = req.query;

    const apiKey = process.env.WEATHER_API_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: "Weather API failed" });

  }

};

export const getPhoneInfo = async (req: Request, res: Response) => {

  try {

    const { number } = req.query;

    const apiKey = process.env.PHONE_API_KEY;

    const response = await axios.get(
      `https://api.apilayer.com/number_verification/validate?number=${number}`,
      {
        headers: { apikey: apiKey }
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: "Phone lookup failed" });

  }

};

export const getGstDetails = async (req: Request, res: Response) => {

  try {

    const { gstin } = req.query;

    const apiKey = process.env.GST_API_KEY;

    const response = await axios.get(
      `https://api.mastersindia.co/open/gstin/${String(gstin).toUpperCase()}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` }
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: "GST lookup failed" });

  }

};

export const getCompanyDetails = async (req: Request, res: Response) => {

  try {

    const { cin } = req.query;

    const apiKey = process.env.COMPANY_API_KEY;

    const response = await axios.get(
      `https://api.thecompaniesapi.com/v1/companies/in/${String(cin).toUpperCase()}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` }
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: "Company API failed" });

  }

};

export const generateQrCode = async (req: Request, res: Response) => {

  const { data } = req.query;

  const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    String(data)
  )}`;

  res.json({ qrUrl: url });

};

export const shortenUrl = async (req: Request, res: Response) => {

  try {

    const { url } = req.query;

    const response = await axios.get(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
        String(url)
      )}`
    );

    res.json({ shortUrl: response.data });

  } catch (error) {

    res.status(500).json({ error: "URL shortening failed" });

  }

};

export const getRandomUser = async (req: Request, res: Response) => {

  try {

    const response = await axios.get("https://randomuser.me/api/");

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: "Random user API failed" });

  }

};

export const getCryptoPrices = async (req: Request, res: Response) => {

  try {

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: "Crypto API failed" });

  }

};