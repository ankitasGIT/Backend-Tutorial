import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()


//use() --> configuration of middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) // configuration for cors

app.use(express.json({
    limit: "16kb"
}))
//For url encoder
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

//cookie-parser
app.use(cookieParser())

app.use(express.static("public"))



//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/users", userRouter)
export {app}