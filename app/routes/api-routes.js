var Ranking = require("../models/ranking.js");
const Sequelize = require('sequelize');
var sequelize = require('../config/connection.js');

module.exports = function(app) {
  app.post('/api/new', function(req, res) {
    console.log('Ranking: ');
    console.log(req.body);

    Ranking.create({
      movie: req.body.movie,
      rating: req.body.rating
    }).then(function(results) {
      res.end();
    })
  });

  app.get('/api/all', function(req, res) {
    Ranking.findAll({
      where: {
        movie: 'Star Wars: Episode V - The Empire Strikes Back'
      },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg_rating']]
    }).then(function(results) {
      res.json(results);
    })
  });
};
