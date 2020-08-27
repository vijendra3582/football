"use strict";

var Team = require('./../models/team.model');

exports.create = function (req, res) {
  var body = req.body;
  var team = new Team(body);
  team.save().then(function (response) {
    return res.status(200).json({
      status: true,
      message: 'Team created successfully.'
    });
  })["catch"](function (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(500).json({
        status: false,
        message: 'This email id already registered.'
      });
    }

    return res.status(500).json({
      status: false,
      message: 'Team not created.'
    });
  });
};

exports.update = function (req, res) {
  var body = req.body;
  Team.findOneAndUpdate({
    _id: body._id
  }, {
    $set: body
  }, {
    "new": true
  }).then(function (team) {
    if (team) {
      return res.status(200).json({
        status: true,
        message: 'Team updated successfully.'
      });
    } else {
      return res.status(422).json({
        status: false,
        message: 'Team does not exists.'
      });
    }
  })["catch"](function (err) {
    return res.status(500).json({
      status: false,
      message: 'Team not updated.'
    });
  });
};

exports.distroy = function (req, res) {
  var id = req.params.id;
  Team.remove({
    _id: id
  }).select("-password -role").then(function (team) {
    if (team) {
      return res.status(200).json({
        status: true,
        message: 'Team deleted successfully.'
      });
    } else {
      return res.status(422).json({
        status: false,
        message: 'Team does not exists.'
      });
    }
  })["catch"](function (err) {
    return res.status(500).json({
      status: false,
      message: 'Team not deleted.'
    });
  });
};

exports.index = function (req, res) {
  Team.find({}).select("-password -role").sort('-date').then(function (teams) {
    return res.status(200).json({
      status: true,
      data: teams
    });
  })["catch"](function (err) {
    return res.status(500).json({
      status: false,
      message: 'Team not found.'
    });
  });
};

exports.get = function (req, res) {
  var id = req.params.id;
  Team.find({
    _id: id
  }).select("-password -role").then(function (team) {
    return res.status(200).json({
      status: true,
      data: team
    });
  })["catch"](function (err) {
    return res.status(500).json({
      status: false,
      message: 'Team not found.'
    });
  });
};