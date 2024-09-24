import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/router.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,PUT,HEAD,PATCH,POST,DELETE",
  allowedHeaders: "Content-type, Authorization",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/", router);

mongoose
  .connect(process.env.DB_URI_CONNECT)
  .then(() => {
    console.log("connected to shechem servers");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
const host = "192.168.1.3";

const server = app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
