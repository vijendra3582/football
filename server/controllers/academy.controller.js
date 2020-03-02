const { hashSync, genSaltSync } = require("bcryptjs");
const { Validator } = require('node-input-validator');
const { create, update, deleteA, single, all } = require('./../models/academy.model');

exports.insert = (req, res, next) => {
    const body = req.body;

    const v = new Validator(body, {
        name: 'required|string|minLength:2|maxLength:255',
        email: 'required|email|maxLength:255',
        mobile: 'required|phoneNumber',
        password: 'required|minLength:8|maxLength:255|same:confirm_password',
        address_1: 'required|maxLength:65535',
        address_2: 'required|maxLength:65535',
        country: 'required|numeric',
        state: 'required|numeric',
        city: 'required|numeric'
    });


    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }

        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }
            return res.status(200).json({
                status: result.status,
                message: result.message
            });
        });
    });
}

exports.update = (req, res, next) => {
    const body = req.body;

    const v = new Validator(body, {
        name: 'required|string|minLength:2|maxLength:255',
        email: 'required|email|maxLength:255',
        mobile: 'required|phoneNumber',
        address_1: 'required|maxLength:65535',
        address_2: 'required|maxLength:65535',
        country: 'required|numeric',
        state: 'required|numeric',
        city: 'required|numeric'
    });

    body.status = 0;

    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
        update(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err
                });
            }
            return res.status(200).json({
                status: result.status,
                message: result.message
            });
        });
    });
}

exports.delete = (req, res, next) => {
    var academy_id = Number(req.params.academy_id);
    deleteA(academy_id, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        return res.status(200).json({
            status: result.status,
            message: result.message
        });
    });
}

exports.all = (req, res, next) => {
    const page = req.query.page;
    const results = req.query.results;
    const sortField = req.query.sortField;
    let sortOrder = req.query.sortOrder;
    if (sortOrder) {
        if (sortOrder == "ascend")
            sortOrder = "asc";
        else
            sortOrder = "desc";
    }
    const queryParam = { "page": page, "results": results, "sortField": sortField, "sortOrder": sortOrder };

    all(queryParam, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        return res.status(200).json({
            status: true,
            data: result
        });
    });
}

exports.single = (req, res, next) => {
    var academy_id = Number(req.params.academy_id);
    var data = { "field": "id", "value": academy_id };
    single(data, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err
            });
        }
        return res.status(200).json({
            status: true,
            data: result
        });
    });
}