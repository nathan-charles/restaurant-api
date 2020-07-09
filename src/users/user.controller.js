import express from 'express';
import userService from './user.service';

const router = express.Router();

async function authenticate(req, res, next) {
  try {
    const user = await userService.authenticate(req.body);
    if (user) {
      return res.json(user);
    }
    return res
      .status(400)
      .json({ message: 'Username or password is incorrect' });
  } catch (error) {
    return next(error);
  }
}

async function register(req, res, next) {
  try {
    await userService.create(req.body);
    return res.json({});
  } catch (error) {
    return next(error);
  }
}

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);

export default router;
