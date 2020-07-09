import expressJwt from 'express-jwt';
import userService from '../users/user.service';

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  return done();
}

function jwt() {
  return expressJwt({
    secret: process.env.API_SECRET,
    algorithms: ['HS256'],
    isRevoked,
  }).unless({
    path: [
      // public routes that don't require authentication
      '/users/authenticate',
      '/users/register',
    ],
  });
}

export default jwt;
