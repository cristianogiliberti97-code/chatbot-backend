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
  const message = req.body.message;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: message
  });

  res.json({
    reply: response.output[0]?.content[0]?.text
  });
});

app.listen(10000, () => {
  console.log("Server attivo");
});
