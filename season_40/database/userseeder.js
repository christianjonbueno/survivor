const mongoose = require('mongoose');
const db = require('./index.js');
const Model = require('./schema.js');
const userData = require('./user.json');

var seeder = (users) => {

  Model.User.create(users)
    .then(() => console.log('Users seeded'))
    .catch((err) => console.error(err))
};

seeder(userData);