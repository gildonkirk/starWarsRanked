const Sequelize = require('sequelize');

var sequelize = require('../config/connection.js');

var Ranking = sequelize.define('ranking', {
  movie: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  }
});

Ranking.sync();

module.exports = Ranking;
