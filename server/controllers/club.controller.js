const Club = require('./../models/club.model');

exports.create = (req, res) => {
    let body = req.body;
    const club = new Club(body);
    club.save().then((response) => {
        return res.status(200).json({
            status: true,
            message: 'Club created successfully.'
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
            message: 'Club not created.'
        });
    })
}

exports.update = (req, res) => {
    let body = req.body;
    Club.findOneAndUpdate({ _id: body._id }, { $set: body }, { new: true }).then((club) => {
        if (club) {
            return res.status(200).json({
                status: true,
                message: 'Club updated successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Club does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Club not updated.'
        });
    })
}

exports.distroy = (req, res) => {
    let id = req.params.id;
    Club.remove({ _id: id }).select("-password -role").then((club) => {
        if (club) {
            return res.status(200).json({
                status: true,
                message: 'Club deleted successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Club does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Club not deleted.'
        });
    })
}

exports.index = (req, res) => {
    Club.find({}).select("-password -role").sort('-date').then((clubs) => {
        return res.status(200).json({
            status: true,
            data: clubs
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Club not found.'
        });
    })
}

exports.get = (req, res) => {
    let id = req.params.id;
    Club.find({ _id: id }).select("-password -role").then((club) => {
        return res.status(200).json({
            status: true,
            data: club
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Club not found.'
        });
    })
}