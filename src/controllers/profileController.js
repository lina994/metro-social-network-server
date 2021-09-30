import ApiError from '../errors/apiError';
import { isPositiveInteger } from '../utils/validation';
import { User } from '../models/models';

class ProfileController {

  static get_attr_exclude = ['email', 'password', 'role', 'createdAt', 'updatedAt'];

  async getOne(req, res, next) {
    if (!isPositiveInteger(req.query.id)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    let id = parseInt(req.query.id);
    const profile = await User.findByPk(id, {
      attributes: {
        exclude: ProfileController.get_attr_exclude
      }
    });
    res.json(profile);
  }

  async updateOne(req, res, next) {
    if (!isPositiveInteger(req.body.id)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    let id = parseInt(req.body.id);
    const profile = await User.findByPk(id);
    try {
      if (req.body.firstName) {
        profile.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        profile.lastName = req.body.lastName;
      }
      if (req.body.intro) {
        profile.intro = req.body.intro;
      }
      if (req.body.country) {
        profile.country = req.body.country;
      }
      if (req.body.city) {
        profile.city = req.body.city;
      }
      if (req.body.gender) {
        profile.gender = req.body.gender;
      }
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
    if (!isPositiveInteger(req.body.id)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    let id = parseInt(req.body.id);
    const profile = await User.findByPk(id);
    try {
      profile.imgUrl = req.file.path.replace('\\', '/');
      await profile.save();
      res.send();
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
}

export default new ProfileController();

