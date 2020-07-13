import mongoose from 'mongoose';

import User from '../users/user.model';
import Restaurant from '../restaurants/restaurant.model';
import Review from '../reviews/review.model';

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.DATABASE_URI, connectionOptions);
mongoose.Promise = global.Promise;

export default {
  User,
  Restaurant,
  Review,
};
