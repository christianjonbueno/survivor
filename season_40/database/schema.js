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
  image2: String
});

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  players: [playerSchema]
})

module.exports.Player = mongoose.model('Player', playerSchema);
module.exports.User = mongoose.model('User', userSchema);