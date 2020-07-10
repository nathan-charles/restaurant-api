import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import jwt from './helpers/jwt';
import errorHandler from './helpers/error-handler';

/**
 * Controllers (route handlers).
 */
import userController from './users/user.controller';
import restaurantController from './restaurants/restaurant.controller';

/**
 * Create Express server.
 */
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', userController);
app.use('/restaurants', restaurantController);

// global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
