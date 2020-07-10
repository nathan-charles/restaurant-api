import express from 'express';
import restaurantService from './restaurant.service';

const router = express.Router();

async function getAll(req, res, next) {
  try {
    const restaurants = await restaurantService.getAll(req.body);
    return res.json(restaurants);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const restaurant = await restaurantService.create(req.body);
    return res.json(restaurant);
  } catch (error) {
    return next(error);
  }
}

// routes
router.get('/', getAll);
router.post('/', create);

export default router;
