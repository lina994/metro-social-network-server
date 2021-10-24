import ApiError from '../errors/apiError';
import { isPositiveInteger } from '../utils/validation';
import { User, Conversation, Message } from '../models/models';

class ConversationController {

  static attr_exclude = ['email', 'password', 'role', 'createdAt', 'updatedAt'];

  async getPage(req, res, next) {
    if (!isPositiveInteger(req.jwt.id)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    let id = parseInt(req.jwt.id);
    let count = isPositiveInteger(req.query.count)? parseInt(req.query.count) : 20;
    let page = isPositiveInteger(req.query.page)? parseInt(req.query.page) : 1;
    try {
      const user = await User.findByPk(id);
      const conversations = await user.getConversationUser({
        include: {
          model: User,
          as: 'conversationInterlocutor',
          attributes: {
            exclude: ConversationController.attr_exclude
          }
        },
        offset: (page - 1) * count, 
        limit: count 
      });
      res.json(conversations);
    }  catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addConversation(req, res, next) {
    if (!isPositiveInteger(req.jwt.id) || !isPositiveInteger(req.body.id2)) {
      return next(ApiError.badRequest('Incorrect id'));
    }
    let id1 = parseInt(req.jwt.id);
    let id2 = parseInt(req.body.id2);
    
    try {
      const user1 = await User.findByPk(id1);
      const user2 = await User.findByPk(id2);
      const conversation1 = await Conversation.create();
      const conversation2 = await Conversation.create();
      await user1.addConversationUser(conversation1);
      await user2.addConversationInterlocutor(conversation1);
      await user1.addConversationInterlocutor(conversation2);
      await user2.addConversationUser(conversation2);
      await conversation1.reload();
      res.json(conversation1);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteConversation(req, res, next) {
    if (!isPositiveInteger(req.query.conversationId)) {
      return next(ApiError.badRequest('Incorrect conversationId'));
    }
    let conversationId = parseInt(req.query.conversationId);
    try {
      const conversation = await Conversation.findByPk(conversationId);
      if (conversation.userId != req.jwt.id) {
        return next(ApiError.forbidden('You can only delete your own conversations'));
      }
      await Message.destroy({
        where: { conversationId: conversationId }
      });
      await conversation.destroy();
      res.send();
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getMessagePage(req, res, next) {
    if (!isPositiveInteger(req.query.conversationId)) {
      return next(ApiError.badRequest('Incorrect conversationId'));
    }
    let conversationId = parseInt(req.query.conversationId);
    let count = isPositiveInteger(req.query.count)? parseInt(req.query.count) : 20;
    let page = isPositiveInteger(req.query.page)? parseInt(req.query.page) : 1;

    try {
      const conversation = await Conversation.findByPk(conversationId);
      if (conversation.userId != req.jwt.id) {
        return next(ApiError.forbidden('You can only read messages from your own conversations'));
      }
      const messages = await conversation.getMessages({
        offset: (page - 1) * count, 
        limit: count 
      });
      res.json(messages);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
  async sendMessage(req, res, next) {
    if (!isPositiveInteger(req.body.conversationId)) {
      return next(ApiError.badRequest('Incorrect conversationId'));
    }
    let conversationId = parseInt(req.body.conversationId);
    if (conversation.userId != req.jwt.id) {
      return next(ApiError.forbidden('You can only add messages to your own conversations'));
    }
    try {
      const conversation = await Conversation.findByPk(conversationId);
      if (!conversation)
        return next(ApiError.badRequest("conversation doesn't exist"));
      
      let senderId = await conversation.getConversationUser().then(user => user.id);
      let receiverId = await conversation.getConversationInterlocutor().then(user => user.id);
      const conversation2 = await Conversation.findOne({ where: { userId: receiverId, interlocutorId: senderId } });
      if (!conversation2)
        return next(ApiError.badRequest("conversation doesn't exist"));

      const message1 = await Message.create({ 
        messageText: req.body.messageText,
        senderId: senderId,
        receiverId: receiverId
      });
      await conversation.addMessage(message1);

      const message2 = await Message.create({ 
        messageText: req.body.messageText,
        senderId: senderId,
        receiverId: receiverId
      });
      await conversation2.addMessage(message2);
      res.json(message1);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteMessage(req, res, next) {
    if (!isPositiveInteger(req.query.messageId)) {
      return next(ApiError.badRequest('Incorrect messageId'));
    }
    let messageId = parseInt(req.query.messageId);

    try {
      let message = await Message.findByPk(messageId);
      let conversation = await Conversation.findByPk(message.conversationId);
      if (conversation.userId != req.jwt.id) {
        return next(ApiError.forbidden('You can only delete messages from your own conversations'));
      }
      await Message.destroy({
        where: { id: messageId }
      });
      res.send();

    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

}

export default new ConversationController();

