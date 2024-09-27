const express = require('express');
const app = express();

const coinRouter = require('./routes/Coin');

const database = require('./config/database');
const cookieParser = require('cookie-parser');

const cors = require('cors'); //front end ki request ko backend entertain kre

const fileupload = require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// database connect
database.connect();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({//deep dive why credentials:true ?
        origin: "*",
        credentials:true,            //access-control-allow-credentials:true
    })
);

app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);

// http://localhost:4000/api/v1

// routes
app.use("/api/v1/coin",coinRouter);

// default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"server is up and running..."
    })
});




app.listen(PORT,()=>{
    console.log(`App is running at port no.: ${PORT}`)
});