const mongoose = require('mongoose');
const db = require('./index.js');
const Model = require('./schema.js');
const playerData = require('./playerData.json');
const userData = require('./userData.json');

var seeder = (data, users) => {

  Model.Player.create(data)
    .then(() => console.log('Players seeded'))
    .catch((err) => console.error(err));

  Model.User.create(users)
    .then(() => console.log('Users seeded'))
    .catch((err) => console.error(err))
};

seeder(playerData, userData);