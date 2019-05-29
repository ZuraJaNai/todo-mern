const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function checkToken(req, res, next) {
  const token = req.headers.authorization.replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, keys.secretOrKey);
      req.id = decoded.id;
      next();
    } catch (err) {
      return res.status(401).send('Wrong token');
    }
  } else {
    return res.status(401).send('Unauthorized');
  }
};
