import Router from 'express';

import userRouter from './userRouter';
import peopleRouter from './peopleRouter';


const router = new Router();

router.use('/user', userRouter);
router.use('/people', peopleRouter);


// router.post('/');
// router.get('/');
// router.get('/:id');

export default router;

