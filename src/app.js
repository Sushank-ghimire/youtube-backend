import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// Routes Import
import useRouter from "./routes/user.routes.js";

const app = express();

app.use(json({ limit: "16kb" }));

app.use(urlencoded({limit: "16kb", extended: true}));

app.use(express.static("Public"));

app.use(cookieParser());

app.use(cors({
    origin: `${process.env.CORS_ORIGIN}`,
    Credentials: true,
}));


// Routes Declaration
app.use("/api/v1/users", useRouter);

export { app };

// (error, req, res, next)