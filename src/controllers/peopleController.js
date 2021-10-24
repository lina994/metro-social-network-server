import { isPositiveInteger } from '../utils/validation';
import { User } from '../models/models';

class PeopleController {

  static attr_exclude = ['email', 'password', 'role', 'createdAt', 'updatedAt'];

  async getPage(req, res) {
    let count = isPositiveInteger(req.query.count)? parseInt(req.query.count) : 20;
    let page = isPositiveInteger(req.query.page)? parseInt(req.query.page) : 1;
    try {
      const people = await User.findAll({
        attributes: {
          exclude: PeopleController.attr_exclude
        },
        offset: (page - 1) * count, 
        limit: count 
      });
      res.json(people);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
}

export default new PeopleController();

