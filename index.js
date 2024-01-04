// dependencies
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

// route file
import blogRoute from "./routes/blog.Route.js"

// configs
dotenv.config();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
const app = express();

// primary middlewares
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.json());

// routes
// app.use("/", (req, res) => {
//     res.status(200).send(`<p style="text-align: center">Welcome to the Blog server!!</p>`)
// })

// mvc routes
app.use("/api/v1/blog", blogRoute)

// connections
mongoose.connect(CONNECTION_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening in the Port: ${PORT}`)
    })
}).catch((err) => {
    console.log(err)
})