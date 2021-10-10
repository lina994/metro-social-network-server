import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/apiError';
import { isEmail, isPassword } from '../utils/validation';
import { User } from '../models/models';

function generateJwt(id, email, role) {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
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
      if (req.body.firstName) user.firstName = req.body.firstName;
      if (req.body.lastName) user.lastName = req.body.lastName;
      if (req.body.intro) user.intro = req.body.intro;
      if (req.body.country) user.country = req.body.country;
      if (req.body.city) user.city = req.body.city;
      if (req.body.gender) user.gender = req.body.gender;
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
        return next(ApiError.badRequest('Invalid password'));
      }
      const token = generateJwt(user.id, user.email, user.role);
      res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async isAuthorized(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    res.json({ token });
  }

  async logout(req, res) {
    res.json({ message: 'TODO: UserController logout' });
  }
}

export default new UserController();

