const dataAccess = require('../data-access/mangodbAccess');

const messageStore = dataAccess('Messages');

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {
    const message = {
      text: messageContent,

      user,
      date: new Date(),
      channelId,
    };

    await messageStore.insert(message);
    return message;
  },
  updateMessage: async (message) => {
    const success = await messageStore.update(message.id, message);

    if (!success) {
      throw new Error(`Cannot update the message ${message.id}`);
    }

    return message;
  },
  removeMessage: async (messageId) => {
    const success = await messageStore.delete(messageId);
    return success;
  },
  getMessage: async (messageId) => {
    return await messageStore
      .getAll()
      .find((message) => message.id === messageId);
  },
  getAllMessages: async () => {
    return await messageStore.getAll();
  },
  getMessagesForChannel: async (channelId) => {
    const messages = await messageStore.getAll({ channelId });

    const filteredMessages = messages.filter(
      (message) => message.channelId === channelId
    );

    return filteredMessages;
  },
};

module.exports = messageManager;
