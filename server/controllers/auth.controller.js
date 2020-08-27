var bcrypt = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const Admin = require('./../models/admin.model');
const Orgnization = require('./../models/orgnization.model');
const Club = require('./../models/club.model');
const Team = require('./../models/team.model');
const Player = require('./../models/player.model');

exports.login = (req, res, next) => {
    const body = req.body;
    const type = req.params.type;
    let Model;
    if (type === 'admin') {
        Model = Admin;
    } else if (type === 'orgnization') {
        Model = Orgnization;
    } else if (type === 'club') {
        Model = Club;
    } else if (type === 'team') {
        Model = Team;
    } else if (type === 'player') {
        Model = Player;
    }

    Model.findOne({ email: body.email }).then((user) => {
        if (!user) {
            return res.status(500).json({
                status: false,
                message: "Invalid email or password."
            });
        }
        bcrypt.compare(body.password, user.password).then((isMatched) => {
            if (isMatched) {
                user.password = undefined;
                const jsontoken = sign({ result: user }, process.env.JWT_KEY, {
                    expiresIn: process.env.JWT_EXPIRE
                });
                return res.status(200).json({
                    status: true,
                    message: "Login successfully",
                    user: user,
                    token: jsontoken
                });
            } else {
                return res.status(500).json({
                    status: false,
                    message: "Invalid email or password."
                });
            }
        })
    })
}