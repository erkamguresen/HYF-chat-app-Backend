const objectId = require('objectid');

const persistentDataAccess = require('../data-access/persistent');

const messageStore = persistentDataAccess('messages');

const messageManager = {
  createMessage: async (user, messageContent, channelId) => {

    const id = objectId().toString();

    const message = {
      text: messageContent,
      id: id,
      user,
      date: new Date(),
      channelId,
    };


    await messageStore.create(message);
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
    const success = await messageStore.remove(messageId);
    return success;
  },
  getMessage: async (messageId) => {
    return await messageStore.all().find((message) => message.id === messageId);

  },
  getAllMessages: async () => {
    return await messageStore.all();
  },
  getMessagesForChannel: async (channelId) => {

    const messages = await messageStore.all();
    const filteredMessages = messages.filter(
      (message) => message.channelId === channelId
    );

    return filteredMessages;
  },

};

module.exports = messageManager;
