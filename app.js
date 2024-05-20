import express from "express";
// import mongoose from "mongoose";
import router from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";


// mongoose.connect("mongodb://localhost:27017", {
//     dbName: "nodeapi",
// })
//     .then(() => { console.log("database connected") })
//     .catch((e) => console.log(e));

// const schema = new mongoose.Schema({
//     name: "string",
//     email: "string",
//     passw: "string",
// });

// const User = new mongoose.model("User", schema);


config({
    path: "./data/config.env",
})


export const app = express();


// Middleware to send JSON data via postman
// always use json middleware before router M.W
app.use(express.json());
app.use(cookieParser());


// middleware for Using ROUTES
app.use("/api/v1/users", router);   //ADDING CUSTOM URL
app.use("/api/v1/task", taskRouter);



app.get("/", (req, res) => {
    res.send("<h1> Nodejs Api </h1>");
});

// app.listen(4000, () => {
//     console.log("server is working");
// });


