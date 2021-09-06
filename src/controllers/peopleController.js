import { isPositiveInteger } from '../utils/validation';
import { User } from '../models/models';

class PeopleController {

  async getPage(req, res) {
    let count = isPositiveInteger(req.query.count)? parseInt(req.query.count) : 20;
    let page = isPositiveInteger(req.query.page)? parseInt(req.query.page) : 1;
    const people = await User.findAll({ offset: (page - 1) * count, limit: count });
    return res.json(people);
  }
  
}

export default new PeopleController();

