var mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var clubSchema = new Schema({
  role: {
    type: String,
    default: 'club'
  },
  name: {
    type: String,
    required: true
  },
  ownerName: {
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
  secondaryPhoneNumber: {
    type: String,
    default: ''
  },
  stadiumName: {
    type: String,
    default: ''
  },
  orgnizationId: [{
    type: Schema.Types.ObjectId,
    ref: 'Orgnization'
  }],
  avatar: {
    type: String,
    default: "/club.png"
  },
  state: {
    type: Object,
    default: {"id": "", name:""}
  },
  city: {
    default: {"id": "", name:""},
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

clubSchema.pre('find', function () {
  this.where({
    role: 'club'
  });
});

clubSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 12);
  next();
});

var Club = mongoose.model('Club', clubSchema, 'users');

module.exports = Club;
