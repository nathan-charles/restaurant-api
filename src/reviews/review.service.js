import db from '../helpers/db';

const { Review } = db;

async function getAll(restaurant) {
  return Review.find({ restaurant });
}

async function getAverageRating(restaurant) {
  return Review.aggregate([
    {
      $match: {
        restaurant,
      },
    },
    {
      $group: {
        _id: null,
        result: { $avg: '$rating' },
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
  getAverageRating,
  create,
};
