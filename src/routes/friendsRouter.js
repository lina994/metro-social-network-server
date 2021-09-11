import Router from 'express';
import friendsController from '../controllers/friendsController'

const router = new Router();

router.get('/', friendsController.getPage);
router.post('/', friendsController.addFriend);
router.delete('/', friendsController.removeFriend);

export default router;