import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
const JWT_SECRET="check"

export const verifyAdmin = (req, res, next) => {
  // Check if token is present in the request headers
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'You are not authenticated!'));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the user has admin role
    if (decoded.userType !== 'admin') {
      return nex(errorHandler(402,"You are not admin"));
    }

    // If the user has admin role, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid, return an error
    return next(errorHandler(403, 'Token is not valid!'));
  }
};


