import Router from 'express';
import profileController from '../controllers/profileController'

const router = new Router();

router.get('/', profileController.getOne);
router.put('/', profileController.updateOne);

export default router;