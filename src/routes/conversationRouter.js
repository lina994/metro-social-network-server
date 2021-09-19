import Router from 'express';
import conversationController from '../controllers/conversationController'

const router = new Router();

router.get('/', conversationController.getPage);
router.post('/', conversationController.addConversation);
router.delete('/', conversationController.deleteConversation);

router.get('/messages/', conversationController.getMessagePage);
router.post('/messages/', conversationController.sendMessage);
router.delete('/messages/', conversationController.deleteMessage);


export default router;

