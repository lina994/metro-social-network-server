import { Op } from 'sequelize';
import { isPositiveInteger } from '../utils/validation';
import { User } from '../models/models';

class PeopleController {

  static attr_exclude = ['email', 'password', 'role', 'createdAt', 'updatedAt'];

  async getPage(req, res) {
    let count = isPositiveInteger(req.query.count)? parseInt(req.query.count) : 20;
    let page = isPositiveInteger(req.query.page)? parseInt(req.query.page) : 1;

    let filters = [];
    if (req.query.firstName) {
      filters.push({ firstName: req.query.firstName });
    }
    if (req.query.lastName) {
      filters.push({ lastName: req.query.lastName });
    }
    if (req.query.country) {
      filters.push({ country: req.query.country });
    }
    if (req.query.city) {
      filters.push({ city: req.query.city });
    }

    let searchQuery = filters.length === 0 ? {} : { [Op.or]: filters };

    try {
      const people = await User.findAll({
        attributes: {
          exclude: PeopleController.attr_exclude
        },
        offset: (page - 1) * count, 
        limit: count,
        where: searchQuery
      });
      res.json(people);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
}

export default new PeopleController();

