import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message
    });

    res.json({
      reply: response.output?.[0]?.content?.[0]?.text || "no response"
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on", port);
});
