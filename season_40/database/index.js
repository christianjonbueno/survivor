const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/survivor-s40', { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('connected to db'))
  .catch((err) => console.error(err));

module.exports = db;