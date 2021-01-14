const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const jwt = require('express-jwt');

const auth = require('./modules/auth/auth.router');
const locations = require('./modules/locations/locations.router');
const users = require('./modules/users/users.router');

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

// JWT middleware
app.use(
  jwt({ secret: process.env.APP_SECRET, algorithms: ['HS256'] }).unless({
    path: ['/api/auth/login', '/api/auth/signup'],
  })
);

// App routes
app.use('/api/auth', auth);
app.use('/api/locations', locations);
app.use('/api/users', users);
app.use('/api', (req, res) => {
  res.json({
    title: 'Invetory RESTful API',
    description:
      'An API to store information about items stored around your house or your room. Information like name of the item, size, color, location, etc. ',
    contact: {
      name: 'Rafael Abuawad',
      url: 'https://github.com/rafael-abuawad',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/rafael-abuawad/inventory/blob/master/LICENSE',
    },
    version: '0.0.1',
  });
});

// Error handler
app.use(async (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      title: err.name,
      message: err.message,
    },
  });
});

app.listen(app.get('port'), () =>
  console.log(`App listening on http://localhost:${app.get('port')}`)
);
