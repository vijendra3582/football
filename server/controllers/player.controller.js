const Player = require('./../models/player.model');

exports.create = (req, res) => {
    let body = req.body;
    const player = new Player(body);
    player.save().then((response) => {
        return res.status(200).json({
            status: true,
            message: 'Player created successfully.'
        });
    }).catch((error) => {
        if (error.code === 11000) {
            return res.status(500).json({
                status: false,
                message: 'This email id already registered.'
            });
        }
        return res.status(500).json({
            status: false,
            message: 'Player not created.'
        });
    })
}

exports.update = (req, res) => {
    let body = req.body;
    Player.findOneAndUpdate({ _id: body._id }, { $set: body }, { new: true }).then((player) => {
        if (player) {
            return res.status(200).json({
                status: true,
                message: 'Player updated successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Player does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Player not updated.'
        });
    })
}

exports.distroy = (req, res) => {
    let id = req.params.id;
    Player.remove({ _id: id }).select("-password -role").then((player) => {
        if (player) {
            return res.status(200).json({
                status: true,
                message: 'Player deleted successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Player does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Player not deleted.'
        });
    })
}

exports.index = (req, res) => {
    Player.find({}).select("-password -role").sort('-date').then((players) => {
        return res.status(200).json({
            status: true,
            data: players
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Player not found.'
        });
    })
}

exports.get = (req, res) => {
    let id = req.params.id;
    Player.find({ _id: id }).select("-password -role").then((player) => {
        return res.status(200).json({
            status: true,
            data: player
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Player not found.'
        });
    })
}