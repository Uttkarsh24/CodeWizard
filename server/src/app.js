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

app.get("/", (req, res) => {
    res.send("Hello World");
});

//search routes
import searchRouter from "./routes/search.routes.js";
app.use("/api/v1", searchRouter);

export default app;
