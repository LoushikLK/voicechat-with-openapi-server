import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

app.post("/", async (req, res) => {
  try {
    const question = req?.body?.question;
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    res.send(completion.data.choices[0].message);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server  is running on port ${PORT}`);
});
