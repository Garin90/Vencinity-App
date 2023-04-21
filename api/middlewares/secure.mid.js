const User = require('../models/user.model')
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.removeId = (req, res, next) => {
  if (req.body) {
    delete req.body._id;
    delete req.body.confirm;
  }
  next()
};

module.exports.auth = (req, res, next) => {
  const token = req.headers.authoritzation?.split(" ")?.[1];

  if (!token) {
    return next(createError(401, "Missing acces token"))
  }

  try {
    const decoded = jwt.verify(token, process.env.JTW_SECRET);

    User.findById(decoded.sub)
      .then((user) => {
        if (user) {
          req.user = user;
          next()
        } else {
          next(createError(401, "User not found"))
        }
      })
  } catch(err) {
    next(createError(401, "Invalid token"))
  }
};