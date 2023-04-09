import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";
import connectDB from "./config/db.js";
import articleRoutes from "./Routes/articleRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./Routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());

app.use("/api/article", articleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


  app.get("/", (req, res) => {
    res.send("API is running...");
  });


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
