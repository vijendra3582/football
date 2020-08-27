var mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var orgnizationSchema = new Schema({
    role:{
        type: String,
        default: 'orgnization'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: "/orgnization.png"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

orgnizationSchema.pre('find', function () {
    this.where({ role: 'orgnization' });
});

orgnizationSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 12);
    next();
});

var Orgnization = mongoose.model('Orgnization', orgnizationSchema, 'users');

module.exports = Orgnization;