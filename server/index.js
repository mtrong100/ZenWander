import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { connectToMongoDB } from "./utils/dbConnect.js";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectToMongoDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Sever Error";
  return res.status(statusCode).json({ message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
