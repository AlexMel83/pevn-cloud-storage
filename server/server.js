require('dotenv').config({
    path: __dirname +`/.${process.env.NODE_ENV}.env`,
});
const http = require('http');
const express = require('express');
const config = require('./config/config.js');
const { routeInit } = require("./routes");
const cors = require('cors');
const cookieParser = require("cookie-parser");
// const errorMiddleware = require("./middlewares/error-middleware.js");

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
app.use(cookieParser());

routeInit(app, express);
// app.use(errorMiddleware);

server.listen(config.PORT, ()=>{
    console.log(`Server is running on port: ${config.PORT}`);
})