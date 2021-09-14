const crypto = require('crypto');

function createToken() {
  const token = {};
  const tokenHex = crypto.randomBytes(32).toString('hex');
  const createdAt = new Date().getTime();
  const expiresIn = 1000 * 60 * 60 * 24 * 7; // 1 week

  token[tokenHex] = { createdAt, expiresIn };

  return token;
}

module.exports = createToken;
