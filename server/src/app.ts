import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

config();
const app = express();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

// Serve static files from the frontend build directory
const frontendPath = path.resolve(__dirname, "../../clients/dist");
app.use(express.static(frontendPath));

// Catch-all handler to serve the frontend's index.html for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

export default app;
