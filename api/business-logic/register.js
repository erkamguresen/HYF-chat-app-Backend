const persistentDataAccess = require('../data-access/persistent');
const objectId = require('objectid');

const usersStore = persistentDataAccess('users');

const hashPassword = require('../utils/hashPassword');

const registerManager = {
  register: async function (username, password) {
    const hashedPassword = hashPassword(`${username}.${password}`);
    const id = objectId().toString();
    const user = {
      id: id,
      username: username,
      password: hashedPassword,
    };

    // check if user already exists
    const registeredUsers = await usersStore.all();

    const existingUser = registeredUsers.find(
      (user) => user.username === username
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    await usersStore.create(user);

    return { username };
  },
};

module.exports = registerManager;
