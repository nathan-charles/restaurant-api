import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../helpers/db';

const { User } = db;

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, process.env.API_SECRET, {
      expiresIn: '7d',
    });

    return {
      ...user.toJSON(),
      token,
    };
  }

  return null;
}

async function create(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw new Error(`Username "${userParam.username}" is already taken`);
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  return user.save();
}

async function getById(id) {
  return User.findById(id);
}

export default {
  authenticate,
  create,
  getById,
};
