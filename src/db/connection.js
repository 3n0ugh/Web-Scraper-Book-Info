const monk = require('monk');
const db = monk('localhost/books');

module.exports = db;
