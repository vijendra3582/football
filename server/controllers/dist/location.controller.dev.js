"use strict";

var countriesList = require('./../static/countries.json');

var statesList = require('./../static/states.json');

var citiesList = require('./../static/cities.json');

exports.country = function (req, res, next) {
  return res.status(200).json({
    status: true,
    data: countriesList
  });
};

exports.state = function (req, res, next) {
  var country_id = Number(req.params.country_id);
  var states = statesList.filter(function (el) {
    return el.country_id == country_id;
  });
  return res.status(200).json({
    status: true,
    data: states
  });
};

exports.city = function (req, res, next) {
  var state_id = Number(req.params.state_id);
  var cities = citiesList.filter(function (el) {
    return el.state_id == state_id;
  });
  return res.status(200).json({
    status: true,
    data: cities
  });
};