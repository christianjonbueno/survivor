const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router.js');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/survivors', router);

app.listen(port, () => console.log(`Listening on port ${port}`));