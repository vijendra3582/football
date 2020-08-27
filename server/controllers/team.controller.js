const Team = require('./../models/team.model');

exports.create = (req, res) => {
    let body = req.body;
    const team = new Team(body);
    team.save().then((response) => {
        return res.status(200).json({
            status: true,
            message: 'Team created successfully.'
        });
    }).catch((error) => {
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
    })
}

exports.update = (req, res) => {
    let body = req.body;
    Team.findOneAndUpdate({ _id: body._id }, { $set: body }, { new: true }).then((team) => {
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
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Team not updated.'
        });
    })
}

exports.distroy = (req, res) => {
    let id = req.params.id;
    Team.remove({ _id: id }).select("-password -role").then((team) => {
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
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Team not deleted.'
        });
    })
}

exports.index = (req, res) => {
    Team.find({}).select("-password -role").sort('-date').then((teams) => {
        return res.status(200).json({
            status: true,
            data: teams
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Team not found.'
        });
    })
}

exports.get = (req, res) => {
    let id = req.params.id;
    Team.find({ _id: id }).select("-password -role").then((team) => {
        return res.status(200).json({
            status: true,
            data: team
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Team not found.'
        });
    })
}