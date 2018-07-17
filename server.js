let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(express.static('app/public'));

require('./app/routes/api-routes.js')(app);

app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
});
