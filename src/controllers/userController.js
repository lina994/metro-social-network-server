import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/apiError';
import { isEmail, isPassword } from '../utils/validation';
import { setUserFields } from '../utils/userInfo';
import { User } from '../models/models';

// Synchronous sign
// Returns the JsonWebToken as string
function generateJwt(id, email, role) {
  return jwt.sign(  
    {id, email, role},  // payload
    process.env.SECRET_KEY,  // secretOrPrivateKey
    {expiresIn: '24h'}  // options
  );
}

class UserController {

  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password || !isEmail(email) || !isPassword(password)) {
      return next(ApiError.badRequest('Incorrect email or password'));
    }
    try {
      const candidate = await User.findOne({ 
        where: { email: email } 
      });
      if (candidate) {
        return next(ApiError.badRequest('Email is already registered'));
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = await User.build({
        email: email,
        password: hashPassword
      });
      setUserFields(req.body, user);
      await user.save();
      const token = generateJwt(user.id, user.email, user.role);
      res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email: email } 
      });
      if (!user) {
        return next(ApiError.badRequest('User not found'));
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(ApiError.badRequest('Invalid email or password'));
      }
      const token = generateJwt(user.id, user.email, user.role);
      res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async isAuthorized(req, res, next) {
    try {
      const token = generateJwt(req.jwt.id, req.jwt.email, req.jwt.role);
      res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async logout(req, res) {
    res.json({ message: 'TODO: UserController logout' });
  }
}

export default new UserController();

