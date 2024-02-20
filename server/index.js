import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
