const JWT = require('jsonwebtoken');
const JWT_SECRET =
  '34bb2330514a9bb26655c51c945078829174dbf3469212a988df98c9b974123b';

const crypto = require('crypto');

function createToken(user) {
  const payload = {
    iss: 'Hack Your Future Belgium',
    userId: `${user.id}`,
    username: `${user.username}`,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  };

  const token = JWT.sign(payload, JWT_SECRET);

  return token;
}

module.exports = createToken;
