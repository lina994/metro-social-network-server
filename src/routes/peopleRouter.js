import Router from 'express';
import peopleController from '../controllers/peopleController'

const router = new Router();

router.get('/', peopleController.getPage);

export default router;