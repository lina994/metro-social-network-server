import Router from 'express';
import userController from '../controllers/userController'

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.isAuthorized); // check if a user authorized

export default router;

