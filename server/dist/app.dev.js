"use strict";

require("dotenv").config();

var express = require('express');

var bodyParser = require('body-parser');

var Mongoose = require('mongoose');

var path = require('path');

var cors = require('cors');

var authRoutes = require('./routes/auth.route');

var adminRoutes = require('./routes/admin.route');

var orgnizationRoutes = require('./routes/orgnization.route');

var clubRoutes = require('./routes/club.route');

var teamRoutes = require('./routes/team.route');

var playerRoutes = require('./routes/player.route');

var locationRoutes = require('./routes/location.route');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/orgnization', orgnizationRoutes);
app.use('/club', clubRoutes);
app.use('/team', teamRoutes);
app.use('/player', playerRoutes);
app.use('/location', locationRoutes);
app.use(express["static"](path.join(__dirname, 'public')));
app.use("/uploads", express["static"](path.join(__dirname, 'uploads')));
app.use("/api/static", express["static"](path.join(__dirname, 'static')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('*', function (req, res, next) {
  return res.status(404).json({
    status: 0,
    message: "Page not found."
  });
});
Mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Database connected successfully.');
  app.listen(process.env.APP_PORT, function () {
    console.log('Server started successfully.');
  });
})["catch"](function () {});