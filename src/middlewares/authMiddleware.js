import jwt from 'jsonwebtoken';
import ApiError from '../errors/apiError';

function authMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {

    const token = req.headers.authorization.split(' ')[1]; // Bearer tokenString
    if(!token) {
      next(ApiError.unauthorized('unauthorized'));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // id, email, role
    next();
  } catch(e) {
    next(ApiError.unauthorized('unauthorized'));
  }
}

export default authMiddleware;

