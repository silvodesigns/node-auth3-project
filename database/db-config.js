const knex = require('knex');

const config = require('../knexfile.js');

//we mus select the development object from our knex file
const db = knex(config.development);

module.exports = db;