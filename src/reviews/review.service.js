import db from '../helpers/db';

const { Review } = db;

async function getAll(restaurant) {
  return Review.find({ restaurant });
}

async function getReviewStatsForRestaurant(restaurant) {
  return Review.aggregate([
    {
      $match: {
        restaurant,
      },
    },
    {
      $group: {
        _id: null,
        rating: { $avg: '$rating' },
        reviewCount: { $sum: { $toInt: 1 } },
      },
    },
  ]);
}

async function create(params) {
  const review = new Review(params);
  return review.save();
}

export default {
  getAll,
  getReviewStatsForRestaurant,
  create,
};
