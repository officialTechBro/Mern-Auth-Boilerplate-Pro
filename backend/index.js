import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import authRoute from "./routes/auth.route.js";

const app = express()

connectDB()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})