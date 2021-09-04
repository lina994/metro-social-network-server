import Router from 'express';

import userRouter from './userRouter';
import peopleRouter from './peopleRouter';
import profileRouter from './profileRouter';
import friendsRouter from './friendsRouter';
import conversationRouter from './conversationRouter';


const router = new Router();

router.use('/user', userRouter);
router.use('/people', peopleRouter);
router.use('/profile', profileRouter);
router.use('/friends', friendsRouter);
router.use('/conversation', conversationRouter);

// router.post('/');
// router.get('/');
// router.get('/:id');

export default router;

