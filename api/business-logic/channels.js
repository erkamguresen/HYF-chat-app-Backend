const dataAccess = require('../data-access/mangodbAccess');

const channelStore = dataAccess('Channels');

const channelManager = {
  createChannel: async (channelName) => {
    const channel = {
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

    channel.id = channel.id.toString();

    return channel;
  },

  getAllChannels: async () => {
    const channels = await channelStore.getAll();

    channels.forEach((channel) => {
      channel.id = channel._id.toString();
    });

    return channels;
  },
};

module.exports = channelManager;
