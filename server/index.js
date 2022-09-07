const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 4000;

mongoose.connect("mongodb://localhost:27017/auth-test", (err) => {
    if (err){
        console.log(err)
    }
    console.log("Mongo db bağlantısı başarılı");
})

app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        credentials: true,
    })
);

app.use("/auth",require("../server/routers/userRoute"))

app.get("/test", (req,res) =>{
    res.send("it workd");
})

//mongodb://localhost:27017/auth-test

app.listen(port, () => console.log("server port 4000"));