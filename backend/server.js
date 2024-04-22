import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const port = process.env.PORT || 8000;

connectDB();
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port : ${port}`));
