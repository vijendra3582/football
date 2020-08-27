var mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var teamSchema = new Schema({
  role: {
    type: String,
    default: 'team'
  },
  name: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    default: ''
  },
  headCoachName: {
    type: String,
    default: ''
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
  ownerPhoneNumber: {
    type: String,
    default: ''
  },
  numberOfPlayer: {
    type: String,
    default: ''
  },
  orgnizationId: [{
    type: Schema.Types.ObjectId,
    ref: 'Orgnization'
  }],
  clubId: [{
    type: Schema.Types.ObjectId,
    ref: 'Club'
  }],
  avatar: {
    type: String,
    default: "/team.png"
  },
  ground: {
    type: String,
    default: ''
  },
  state: {
    type: Object,
    default: {
      "id": "",
      name: ""
    }
  },
  city: {
    default: {
      "id": "",
      name: ""
    },
    type: Object
  },
  address: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

teamSchema.pre('find', function () {
  this.where({
    role: 'team'
  });
});

teamSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 12);
  next();
});

var Team = mongoose.model('Team', teamSchema, 'users');

module.exports = Team;
