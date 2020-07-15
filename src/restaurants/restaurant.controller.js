import express from 'express';
import restaurantService from './restaurant.service';

async function create(req, res, next) {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access is required to create Restaurant.' });
    }
    const restaurant = await restaurantService.create(req.body);
    return res.json(restaurant);
  } catch (error) {
    return next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const restaurants = await restaurantService.getAll(req.body);
    return res.json(restaurants);
  } catch (error) {
    return next(error);
  }
}

async function getById(req, res, next) {
  try {
    const restaurant = await restaurantService.getById(req.params.id);
    if (!restaurant) {
      return res.status(404);
    }
    return res.json(restaurant);
  } catch (error) {
    return next(error);
  }
}

async function deleteById(req, res, next) {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Admin access is required to delete Restaurant.' });
    }
    await restaurantService.deleteById(req.params.id);
    return res.json({});
  } catch (error) {
    return next(error);
  }
}

// routes
const router = express.Router();
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
// router.put('/:id', getById);
router.delete('/:id', deleteById);

export default router;
