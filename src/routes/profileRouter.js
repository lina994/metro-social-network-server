import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import upload from '../middlewares/fileMiddleware';
import profileController from '../controllers/profileController'

const router = new Router();

router.get('/', profileController.getOne);
router.put('/', authMiddleware, profileController.updateOne);
router.put('/img', authMiddleware, upload.single('avatar'), profileController.updateImage);

export default router;

