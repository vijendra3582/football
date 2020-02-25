//Import Libraries
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route');
const locationRoutes = require('./routes/location.route');
const academyRoutes = require('./routes/academy.route');
//Get port
const portNode = process.env.APP_PORT;

const app = express();

//Parse Form Packet of data
app.use(bodyParser.urlencoded({ extended: true }));

//Parse json packet data
app.use(bodyParser.json());



//Route Middleware
app.use('/auth', authRoutes);
app.use('/location', locationRoutes);
app.use('/academy', academyRoutes);

app.get('*', (req, res, next) => {
    return res.status(404).json({
        status: 0,
        message: "Page not found."
    });
});

app.listen(portNode, () => {
    console.log("Server is up and running on PORTs :", portNode);
});