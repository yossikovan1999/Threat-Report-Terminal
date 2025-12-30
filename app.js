import "dotenv/config";
import express from "express";
import db from "./database/connection.js";
import reportsRoute from "./routes/reports.js";

const app = express();

app.use(express.json());


app.use("/reports", reportsRoute);

app.listen(3000, (err)=>{
    console.log("listening - http://localhost:3000/")
})
