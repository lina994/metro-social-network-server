class ConversationController {

  async getAll(req, res) {
    res.json({ message: 'TODO: ConversationController getAll' });
  }

  async getAllMessages(req, res) {
    res.json({ message: 'TODO: ConversationController getAllMessages' });
  }
  
  async sendMessage(req, res) {
    res.json({ message: 'TODO: ConversationController sendMessage' });
  }

  async deleteMessage(req, res) {
    res.json({ message: 'TODO: ConversationController deleteMessage' });
  }

}

export default new ConversationController();