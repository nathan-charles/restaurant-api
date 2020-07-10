import db from '../helpers/db';

const { Restaurant } = db;

async function getAll() {
  return Restaurant.find();
}

async function create(params) {
  const restaurant = new Restaurant(params);
  return restaurant.save();
}

export default {
  getAll,
  create,
};
