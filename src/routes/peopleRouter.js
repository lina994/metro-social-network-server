import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import peopleController from '../controllers/peopleController'

const router = new Router();

router.get('/', authMiddleware, peopleController.getPage);

export default router;

