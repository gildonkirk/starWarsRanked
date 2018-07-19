var Ranking = require("../models/ranking.js");

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

  // app.get('/api/all', function(req, res) {
  //   Ranking.findAll().then(function(results) {
  //     console.log(results);
  //     res.json(results);
  //   })
  // });
};
