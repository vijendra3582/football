var bcrypt = require('bcryptjs');
const Admin = require('./../models/admin.model');

exports.create = (req, res) => {
    let body = req.body;
    bcrypt.hash(body.password, 12).then((hashPassword) => {
        body.password = hashPassword;
        const admin = new Admin(body);
        admin.save().then((response) => {
            return res.status(200).json({
                status: true,
                message: 'Admin created successfully.'
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
                message: error
            });
        })
    });
}

exports.update = (req, res) => {
    let body = req.body;
    Admin.findOneAndUpdate({ _id: body._id }, { $set: body }, { new: true }).then((admin) => {
        if (admin) {
            return res.status(200).json({
                status: true,
                message: 'Admin updated successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Admin does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Admin not updated.'
        });
    })
}

exports.distroy = (req, res) => {
    let id = req.params.id;
    Admin.remove({ _id: id }).select("-password -role").then((admin) => {
        if (admin) {
            return res.status(200).json({
                status: true,
                message: 'Admin deleted successfully.'
            });
        } else {
            return res.status(422).json({
                status: false,
                message: 'Admin does not exists.'
            });
        }
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Admin not deleted.'
        });
    })
}

exports.index = (req, res) => {
    Admin.find({}).select("-password -role").sort('-date').then((admins) => {
        return res.status(200).json({
            status: true,
            data: admins
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Admin not found.'
        });
    })
}

exports.get = (req, res) => {
    let id = req.params.id;
    Admin.find({ _id: id }).select("-password -role").then((admin) => {
        return res.status(200).json({
            status: true,
            data: admin
        });
    }).catch((err) => {
        return res.status(500).json({
            status: false,
            message: 'Admin not found.'
        });
    })
}