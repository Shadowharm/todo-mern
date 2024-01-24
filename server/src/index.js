import express from 'express'
import mongoose from "mongoose";
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json())

app.use('/api/user', userRouter)

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

const PORT = process.env.PORT || 3001;
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

start()