const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Validator } = require('node-input-validator');
const {
    create,
    getUserByUserEmail,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser
} = require('./../models/user.model');

exports.register = (req, res, next) => {

    const body = req.body;
    const v = new Validator(body, {
        name: 'required|string|minLength:2',
        email: 'required|email',
        mobile: 'required|phoneNumber',
        password: 'required|minLength:8|same:confirm_password'
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
};

exports.login = (req, res, next) => {
    const body = req.body;
    const v = new Validator(body, {
        email: 'required|email',
        password: 'required'
    });

    v.check().then((matched) => {
        if (!matched) {
            return res.status(422).json({
                status: false,
                message: { "errors": v.errors }
            });
        }

        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }

            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_EXPIRE
                });
                return res.status(200).json({
                    status: true,
                    message: "Login successfully",
                    user: results,
                    token: jsontoken
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }
        });
    });
};

exports.me = (req, res, next) => {
    return res.status(200).json({
        status: true,
        user: req.user
    });
};
