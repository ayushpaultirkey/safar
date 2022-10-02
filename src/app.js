const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const server = http.createServer(app);
const cookieParser = require("cookie-parser");

//use cookie
app.use(cookieParser());

//Create static path to access public, upload contents
app.use('/public', express.static('./public'));
app.use('/upload', express.static('./upload'));

//Create app router
const AppRouter = require("./router/router");
app.use("/", AppRouter);

//Listen to port
server.listen(process.env.PORT || 3000, () => {
    console.log("listening on *:3000");
});