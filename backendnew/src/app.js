import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// app.use(express.json({limit: "16kb"}))
app.use(express.json())
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.urlencoded())
// app.use(express.static("public"))
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes); /// ye prefix hoti h...

export {app}