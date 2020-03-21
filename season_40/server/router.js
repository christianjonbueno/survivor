const express = require('express');
const Router = express.Router();
const controller = require('./controller.js');

Router
  .route('/players')
  .get(controller.getPlayers)

Router
  .route('/users')
  .get(controller.getUsers)

Router
  .route('/players/:id')
  .put(controller.editPlayer)
  
Router
  .route('/addPlayerToUser/:id')
  .put(controller.addPlayerToUser)

Router
  .route('/removePlayerFromUser/:id')
  .put(controller.removePlayerFromUser)

module.exports = Router;