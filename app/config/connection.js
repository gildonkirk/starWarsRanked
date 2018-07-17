const Sequelize = require('sequelize');

var sequelize - new Sequelize('star_wars_db', 'root', 'certifiedG48*', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been successfully established');
  })
  .catch(err => {
    console.error('Unable to connect to the database', err);
  });

  module.exports = sequelize;
