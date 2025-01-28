import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({
    limit: "16kb",
}));

app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

import searchRouter from "./routes/search.routes.js";
app.use("/api/v1", searchRouter);

import generationRouter from "./routes/generation.routes.js";
app.use("/api/v1/generate", generationRouter);

export default app;
