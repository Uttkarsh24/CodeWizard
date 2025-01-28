import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

//search routes
import searchRouter from "./routes/search.routes.js";
app.use("/api/v1", searchRouter);

export default app;
