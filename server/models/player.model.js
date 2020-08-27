var mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var playerSchema = new Schema({
    role:{
        type: String,
        default: 'player'
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
    dateOfBirth: {
        type: String,
        default: ''
    },
    playingPosition: {
        type: String,
        default: ''
    },
    prefPlayingPosition: {
        type: String,
        default: ''
    },
    prefFoot: {
        type: String,
        default: ''
    },
    currentCountry: {
        type: String,
        default: ''
    },
    nationality: {
        type: String,
        default: ''
    },
    coreSkills: {
        type: String,
        default: ''
    },
    orgnizationId: {
        type: String,
        default: ''
    },
    clubId: {
        type: String,
        default: ''
    },
    teamId: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: "/player.png"
    },
    weight: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    aboutMe: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
});

playerSchema.pre('find', function () {
    this.where({ role: 'player' });
});

playerSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, 12);
    next();
});

var Player = mongoose.model('Player', playerSchema, 'users');

module.exports = Player;