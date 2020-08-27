const Orgnization = require('./../models/orgnization.model');

exports.create = (req, res) => {
    let body = req.body;
    const orgnization = new Orgnization(body);
    orgnization.save().then((response) => {
        return res.status(200).json({
            status: true,
            message: 'Orgnization created successfully.'
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
            message: 'Orgnization not created.'
        });
    })
}

exports.update = (req, res) => {
    let body = req.body;
    Orgnization.findOneAndUpdate({ _id: body._id }, { $set: body }, { new: true }).then((orgnization) => {
        if (orgnization) {
            return res.status(200).json({
                status: true,
                message: 'Orgnization updated successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Orgnization does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Orgnization not updated.'
        });
    })
}

exports.distroy = (req, res) => {
    let id = req.params.id;
    Orgnization.remove({ _id: id }).select("-password -role").then((orgnization) => {
        if (orgnization) {
            return res.status(200).json({
                status: true,
                message: 'Orgnization deleted successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Orgnization does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Orgnization not deleted.'
        });
    })
}

exports.index = (req, res) => {
    Orgnization.find({}).select("-password -role").sort('-date').then((orgnizations) => {
        return res.status(200).json({
            status: true,
            data: orgnizations
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Orgnization not found.'
        });
    })
}

exports.get = (req, res) => {
    let id = req.params.id;
    Orgnization.find({ _id: id }).select("-password -role").then((orgnization) => {
        return res.status(200).json({
            status: true,
            data: orgnization
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Orgnization not found.'
        });
    })
}