import db from '../helpers/db';

const { Restaurant } = db;

async function getAll() {
  return Restaurant.find();
}

async function getById(id) {
  return Restaurant.findById(id);
}

async function create(params) {
  const restaurant = new Restaurant(params);
  return restaurant.save();
}

async function update(id, params) {
  const restaurant = await Restaurant.findById(id);
  Object.assign(restaurant, params);
  return restaurant.save();
}

async function deleteById(id) {
  return Restaurant.findByIdAndRemove(id);
}

export default {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
