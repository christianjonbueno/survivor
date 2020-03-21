const schema = require('../database/models/schema');
const db = require('../database');

const controller = {
  getPlayers : (req, res) => {
    schema.Player.find()
      .then((list) => {
        res.status(200).send(list)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  },
  getUsers : (req, res) => {
    schema.User.find().populate("players")
      .then((list) => {
        res.status(201).send(list)
      })
      .catch((err) => {
        res.status(401).send(err)
      })
  },
  editPlayer : (req, res) => {
    schema.Player.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .then((player) => {
        res.status(202).send(player)
      })
      .catch((err) => {
        res.status(402).send(err)
      })
  },
  addPlayerToUser : (req, res) => {
    schema.User.findByIdAndUpdate(req.params.id, {$push: {players: req.body._id}}, {new:true})
      .then((user) => {
        res.status(202).send(user)
      })
      .catch((err) => {
        res.status(402).send(err)
      })
  },
  removePlayerFromUser : (req, res) => {
    schema.User.findByIdAndUpdate(req.params.id, {$pull: {players: req.body._id}}, {new:true})
      .then((user) => {
        res.status(202).send(user)
      })
      .catch((err) => {
        res.status(402).send(err)
      })
  }
}

module.exports = controller;