import ApiError from '../errors/apiError';
import { isPositiveInteger } from '../utils/validation';
import { User } from '../models/models';

class FriendsController {

  static attr_exclude = ['email', 'password', 'role', 'createdAt', 'updatedAt'];

  async getPage(req, res, next) {
    if (!isPositiveInteger(req.query.id)) {
      return next(ApiError.badRequest('Incorrect id'))
    }
    let id = parseInt(req.query.id);
    let count = isPositiveInteger(req.query.count)? parseInt(req.query.count) : 20;
    let page = isPositiveInteger(req.query.page)? parseInt(req.query.page) : 1;
    const user = await User.findByPk(id);
    const friends = await user.getFriends({
      attributes: {
        exclude: FriendsController.attr_exclude
      }
    });
    res.json(friends);
  }


  async addOne(req, res, next) {
    if (!isPositiveInteger(req.body.id1) || !isPositiveInteger(req.body.id2)) {
      return next(ApiError.badRequest('Incorrect id'))
    }
    let id1 = parseInt(req.body.id1);
    let id2 = parseInt(req.body.id2);

    try {
      let user1 = await User.findByPk(id1);
      let user2 = await User.findByPk(id2);
      user1.addFriend(user2);
      user2.addFriend(user1);
      await user1.reload();
      const friend = await user1.getFriends({
        where: { id: id2},
        attributes: {
          exclude: FriendsController.attr_exclude
        }
      });
      res.json(friend[0]);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async removeOne(req, res) {
    res.json({ message: 'TODO: FriendsController removeOne' });
  }

}

export default new FriendsController();
