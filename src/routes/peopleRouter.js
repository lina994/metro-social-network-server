import Router from 'express';
import peopleController from '../controllers/peopleController'

const router = new Router();

router.get('/', peopleController.getAll);
router.get('/:id', peopleController.getOne);

export default router;