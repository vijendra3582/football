var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    role: {
        type: String,
        default: 'admin'
    },
    name: {
        type: String,
        required: [true, 'This field is required.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'This field is required.']
    },
    password: {
        type: String,
        required: [true, 'This field is required.']
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: "/admin.png"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

adminSchema.pre('find', function () {
    this.where({ role: 'admin' });
});

var Admin = mongoose.model('Admin', adminSchema, 'users');

module.exports = Admin;