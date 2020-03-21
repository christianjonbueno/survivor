const mongoose = require('mongoose');
const db = require('./index.js');
// const Model = require('./schema.js');
const Model = require('./models/schema.js');
const playerData = require('./playerData.json');
const userData = require('./userData.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash(password, saltRounds)
  .then((hash) => {
    var admin = {
      name: "admin",
      password: hash
    };
    Model.Admin.create(admin)
      .then(() => console.log('Admin Created with hashed password: ', hash))
      .catch((err) => console.error(err))
  })


var seeder = (data, users) => {

  // Model.Player.create(data)
  //   .then(() => console.log('Players seeded'))
  //   .catch((err) => console.error(err));

  // Model.User.create(users)
  //   .then(() => console.log('Users seeded'))
  //   .catch((err) => console.error(err))

    // Model.Admin.create(admin)
    //   .then(() => console.log('Admin created'))
    //   .catch((err) => console.error(err))

};

// seeder(playerData, userData);