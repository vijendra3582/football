const { hashSync, genSaltSync } = require("bcrypt");
const { Validator } = require('node-input-validator');
const {
    create,
    update,
    delete,
    single,
    all
} = require('./../models/academy.model');

exports.insert = (req, res, next) => {
    const body = req.body;

    const v = new Validator(body, {
        name: 'required|string|minLength:2|maxLength:255',
        email: 'required|email|maxLength:255',
        mobile: 'required|phoneNumber',
        password: 'required|minLength:8|maxLength:255|same:confirm_password',
        address_1: 'required|maxLength:65535',
        address_2: 'required|maxLength:65535',
        country: 'required|number',
        state: 'required|number',
        city: 'required|number'
    });

    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }
    });
}