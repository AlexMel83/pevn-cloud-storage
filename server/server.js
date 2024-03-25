require('dotenv').config({
    path: __dirname +`/.${process.env.NODE_ENV}.env`,
});
const http = require('http');
const express = require('express');
const config = require('./config/config.js');
const cors = require('cors');

const app =express();
const server = http.createServer(app);

app.use(
    cors({
        credentials: true,
        origin: [process.env.CLIENT_URL, "http://localhost:3000"],
        exposedHeaders: ["Access-Control-Allow-Credentials"],
    })
);
app.use("/uploads", express.static("uploads"));

server.listen(config.PORT, ()=>{
    console.log(`Server is running on port: ${config.PORT}`);
})