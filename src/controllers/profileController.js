import ApiError from '../errors/apiError';
import { isPositiveInteger } from '../utils/validation';
import { setUserFields } from '../utils/userInfo';
import { User } from '../models/models';

class ProfileController {

  static get_attr_exclude = ['email', 'password', 'role', 'createdAt', 'updatedAt'];

  async getOne(req, res, next) {
    if (!isPositiveInteger(req.query.id)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    try {
      let id = parseInt(req.query.id);
      const profile = await User.findByPk(id, {
        attributes: {
          exclude: ProfileController.get_attr_exclude
        }
      });
      if (!profile) {
        return next(ApiError.notFound('User not found'));
      }
      res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateOne(req, res, next) {
    if (!isPositiveInteger(req.jwt.id)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    try {
      let id = parseInt(req.jwt.id);
      const profile = await User.findByPk(id);
      if (!profile) {
        return next(ApiError.badRequest('User not found'));
      }
      setUserFields(req.body, profile);
      await profile.save();
      res.send();
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateImage(req, res, next) {
    if (!req.file) {
      return next(ApiError.badRequest('No file received or invalid file'));
    }
    if (!isPositiveInteger(req.jwt.id)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    try {
      let id = parseInt(req.jwt.id);
      const profile = await User.findByPk(id);
      if (!profile) {
        return next(ApiError.badRequest('User not found'));
      }
      profile.imgUrl = req.file.path.replace('\\', '/');
      await profile.save();
      res.send();
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
}

export default new ProfileController();

