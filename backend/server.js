import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.all("/api", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const hasBody = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        "Content-Type": req.headers["content-type"] || "application/json",
      },
      body: hasBody ? JSON.stringify(req.body) : undefined,
    });
    const responseData = await response.text();
    res.status(response.status).send(responseData);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Failed to fetch", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`CORS Proxy running on ${port}`);
});
