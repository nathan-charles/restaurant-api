import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../helpers/db';

const { User } = db;

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, process.env.API_SECRET, {
      expiresIn: '7d',
    });

    return {
      ...user.toJSON(),
      token,
    };
  }

  return null;
}

async function create(params) {
  // validate
  if (await User.findOne({ username: params.username })) {
    throw new Error(`Username "${params.username}" is already taken`);
  }

  const user = new User(params);

  // hash password
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
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
