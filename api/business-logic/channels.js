// const objectId = require('objectid');

// const persistentDataAccess = require('../data-access/persistent');

// const channelStore = persistentDataAccess('channels');

const dataAccess = require('../data-access/mangodbAccess');

const channelStore = dataAccess('Channels');

const channelManager = {
  createChannel: async (channelName) => {
    // const id = objectId().toString();
    const channel = {
      // id: id,
      name: channelName,
    };
    const response = await channelStore.insert(channel);

    if (response.insertedCount === 0) {
      throw new Error('Channel could not be created');
    }

    channel['id'] = response.insertedId.toString();
    return channel;
  },

  updateChannel: async (channel) => {
    const success = await channelStore.update(channel.id, channel);
    if (!success) {
      throw new Error("Cannot update a channel that doesn't exist!");
    }
    return channel;
  },
  removeChannel: async (channelId) => {
    const success = await channelStore.delete(channelId);

    if (!success) {
      throw new Error("Cannot delete a channel that doesn't exist!");
    }
    return true;
  },
  getChannel: async (channelId) => {
    const channel = await channelStore.getById(channelId);
    if (!channel) {
      throw new Error(`Could not find channel with id ${channelId}!`);
    }
    return channel;
  },
  getAllChannels: async () => {
    return await channelStore.getAll();
  },
};

module.exports = channelManager;
