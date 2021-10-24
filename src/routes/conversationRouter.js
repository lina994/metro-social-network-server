import Router from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import conversationController from '../controllers/conversationController'

const router = new Router();

router.get('/', authMiddleware, conversationController.getPage);
router.post('/', authMiddleware, conversationController.addConversation);
router.delete('/', authMiddleware, conversationController.deleteConversation);

router.get('/messages/', authMiddleware, conversationController.getMessagePage);
router.post('/messages/', authMiddleware, conversationController.sendMessage);
router.delete('/messages/', authMiddleware, conversationController.deleteMessage);


export default router;

