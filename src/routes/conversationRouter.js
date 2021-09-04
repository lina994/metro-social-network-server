import Router from 'express';
import conversationController from '../controllers/conversationController'

const router = new Router();

router.get('/', conversationController.getAll);
router.get('/messages/', conversationController.getAllMessages);
router.post('/messages/', conversationController.sendMessage);
router.delete('/messages/', conversationController.deleteMessage);


export default router;

