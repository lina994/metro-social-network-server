import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import userController from '../controllers/userController';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.isAuthorized); // check if a user authorized
router.get('/logout', userController.logout); 

export default router;

