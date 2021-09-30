import Router from 'express';
import profileController from '../controllers/profileController'

import upload from '../middlewares/fileMiddleware';

const router = new Router();

router.get('/', profileController.getOne);
router.put('/', profileController.updateOne);
router.put('/img', upload.single('avatar'), profileController.updateImage);

export default router;

