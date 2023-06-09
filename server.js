import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import gigRoute from "./routes/gig.route.js"
import orderRoute from "./routes/order.route.js"
import conversationRoute from "./routes/conversation.route.js"
import messageRoute from "./routes/message.route.js"
import reviewRoute from "./routes/review.route.js"
import cookieParser from "cookie-parser"
import cors from 'cors';

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connection successful")
    } catch (error) {
        console.log(error)
    }
}

const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.VITE_CLIENT_URL_PROD
  : process.env.VITE_CLIENT_URL_DEV;

app.use(cors({origin:`${API_URL}`, credentials:true}))

// app.use(cors({origin:"https://reactfiverr.netlify.app", credentials:true}))
// app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
app.use("/api/reviews", reviewRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).send(errorMessage)
})

const PORT = process.env.PORT || 9900

app.listen(PORT, ()=>{
    connect()
    console.log("Backend server started")
})