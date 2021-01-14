const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

// App config
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('static', path.join(__dirname, 'public'));

// App middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('static', express.static(app.get('static')));
app.use(morgan(app.get('env') == 'production' ? 'common' : 'dev'));

// App routes
app.get('/', (req, res) => {
  res.send('Base route');
});

app.listen(app.get('port'), () =>
  console.log(`App listening on http://localhost:${app.get('port')}`)
);
