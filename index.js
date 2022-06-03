import express from "express";
import mongoose from "mongoose";
import Router from "./Router.js"

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use("/auth", Router)


const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://Manucher:123qwe123@cluster0.mcnhe.mongodb.net/?retryWrites=true&w=majority")
        app.listen(PORT, () => {
            console.log(`Start ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()