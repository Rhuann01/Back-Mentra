import express from "express";
import iaRes from "./routes/resIA.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/ai", iaRes);

export default app;
