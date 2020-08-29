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
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orgnization', orgnizationRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/location', locationRoutes);
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