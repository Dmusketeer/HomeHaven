import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/Auth.js";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome");
});
// app.get("*", (req, res) => {
//   res.status(500).json({ message: "Internal Server Error" });
// });

mongoose
  .connect(process.env.MongoDB_URI)
  .then(() => {
    console.log(`HomeHaven App connected to Database!`);
    app.listen(PORT, () => {
      console.log(`Server listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log({ error: error.message });
  });

app.use("/", AuthRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Err";
  return res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});
