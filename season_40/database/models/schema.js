const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  name: String,
  tribe: String,
  seasons: String,
  image: String,
  idols: Number,
  advantages: String,
  extinction: Boolean,
  eliminated: Boolean,
  chosen: Boolean,
  image2: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }]
})

const adminSchema = mongoose.Schema({
  name: String,
  password: String
});

module.exports.Player = mongoose.model('Player', playerSchema);
module.exports.User = mongoose.model('User', userSchema);
module.exports.Admin = mongoose.model('Admin', adminSchema);