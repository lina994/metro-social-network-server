import ApiError from '../errors/apiError';

class UserController {

  async registration(req, res, next) {
    // const { email, password, role } = req.body;
    // if (!email || !password) {
    //   return next(ApiError.badRequest('Incorrect email or password'));
    // }

    res.json({ message: 'TODO: UserController registration' });
  }

  async login(req, res) {
    res.json({ message: 'TODO: UserController login' });
  }

  async isAuthorized(req, res) {
    res.json({ message: 'TODO: UserController isAuthorized' });
  }

  async logout(req, res) {
    res.json({ message: 'TODO: UserController logout' });
  }
}

export default new UserController();

