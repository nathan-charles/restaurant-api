import express from 'express';
import reviewService from './review.service';
import restaurantService from '../restaurants/restaurant.service';

async function create(req, res, next) {
  try {
    const { sub, username } = req.user;

    const params = {
      ...req.body,
      author: {
        id: sub,
        username,
      },
    };

    const review = await reviewService.create(params);

    // Compute new average rating for resaurant
    const { restaurant } = req.body;
    const averageRating = await reviewService.getReviewStatsForRestaurant(restaurant);
    const { rating, reviewCount } = averageRating[0];
    restaurantService.update(restaurant, { rating, reviewCount });

    // Return created review
    return res.json(review);
  } catch (error) {
    return next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const reviews = await reviewService.getAll(req.query.restaurant);
    return res.json(reviews);
  } catch (error) {
    return next(error);
  }
}

// routes
const router = express.Router();
router.post('/', create);
router.get('/', getAll);
// router.put('/:id', getById);
// router.delete('/:id', getById);

export default router;
