import Router from 'express';
import friendsController from '../controllers/friendsController'

const router = new Router();

router.get('/', friendsController.getAll);
router.post('/', friendsController.addOne);
router.delete('/', friendsController.removeOne);

export default router;