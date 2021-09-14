const persistentDataAccess = require('../data-access/persistent');
const usersStore = persistentDataAccess('users');

const isValidToken = async (token, username) => {
  const registeredUsers = await usersStore.all();
  const user = registeredUsers.find((user) => user.username === username);

  if (!user || !user.token) {
    return false;
  }

  if (!user.token[token] || Object.keys(user.token)[0].localeCompare(token)) {
    return false;
  }

  if (user.token[token].createdAt + user.token[token].expiresIn < Date.now()) {
    return false;
  }

  return true;
};

module.exports = isValidToken;
