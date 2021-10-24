import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import friendsController from '../controllers/friendsController'

const router = new Router();

router.get('/', friendsController.getPage);
router.post('/', authMiddleware, friendsController.addFriend);
router.delete('/', authMiddleware, friendsController.removeFriend);

export default router;

