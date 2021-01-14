const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

// App config
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('static', path.join(__dirname, 'public'));
app.set('view engine', 'html');

// App middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('static', express.static(app.get('static')));
app.use(morgan(app.get('env') == 'production' ? 'common' : 'dev'));
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: app.get('env') === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// App view engine
nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app,
});

// App routes
app.get('/', (req, res) => {
  res.send('Base route');
});

app.listen(app.get('port'), () =>
  console.log(`App listening on http://localhost:${app.get('port')}`)
);
