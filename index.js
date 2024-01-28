// dependencies
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { readFileSync } from "fs";

// route file
import blogRoute from "./routes/blog.Route.js"
import userRouter from "./routes/user.Route.js"

// configs
dotenv.config();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
const app = express();

// primary middlewares
app.use(cors());
app.use(express.urlencoded({ limit: "500mb", extended: false }));
app.use(express.json({ limit: "500mb" }));

// MVC routes
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/user", userRouter);

// Catch-all route
app.use("/", (req, res) => {
    try {
        // Assuming the file is in the same directory as your server file
        const content = readFileSync("error.html", { encoding: "utf-8" })
        res.status(200).send(content);
    } catch (error) {
        console.error('Error reading HTML file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// connections
mongoose.connect(CONNECTION_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening in the Port: ${PORT}`)
    })
}).catch((err) => {
    console.log(err)
})
