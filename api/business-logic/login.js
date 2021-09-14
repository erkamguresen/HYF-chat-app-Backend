const persistentDataAccess = require('../data-access/persistent');

const usersStore = persistentDataAccess('users');

const createToken = require('../utils/createToken');
const hashPassword = require('../utils/hashPassword');

const loginManager = {
  checkPassword: async function (username, password) {
    if (!username || !password) {
      res.status(400).send('Missing username or password');
      return;
    }
    const hashedPassword = hashPassword(password);
    const user = { username: username, password: hashedPassword };

    const registeredUsers = await usersStore.all();

    const existingUser = registeredUsers.find(
      (user) => user.username === username && user.password === hashedPassword
    );

    if (!existingUser) {
      throw new Error('Invalid username or password !');
    }

    const token = createToken();
    existingUser.token = token;

    const update = await usersStore.update(existingUser.id, existingUser);

    return {
      token: Object.keys(token)[0],
      username,
      message: `Session created for user ${username}`,
    };
  },
};

module.exports = loginManager;
