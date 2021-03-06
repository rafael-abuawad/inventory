import { config } from 'dotenv';
import { join } from 'path';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import jwt from 'express-jwt';
config();

import auth from './auth/auth.router';
import items from './items/items.router';
import locations from './locations/locations.router';
import users from './users/users.router';
import api from './app.router';

const app = express();

// App config
const PORT = process.env.PORT || 8080;
const APP_SECRET = process.env.APP_SECRET || 'secret';
const ITEM_UPLOADS_ROUTE = join(__dirname, 'uploads/items');
const LOGS = app.get('env') === 'production' ? 'common' : 'dev';

// App middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads/items', express.static(ITEM_UPLOADS_ROUTE));
app.use(morgan(LOGS));

// JWT middleware
app.use(
  jwt({ secret: APP_SECRET, algorithms: ['HS256'] }).unless({
    path: ['/api/auth/login', '/api/auth/signup'],
  })
);

// App routes
app.use('/api/auth', auth);
app.use('/api/items', items);
app.use('/api/locations', locations);
app.use('/api/users', users);
app.use('/api', api);

// Error handler
app.use(async (error: Error, _req: Request, res: Response) => {
  res.status(500).json({ error });
});

app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);
