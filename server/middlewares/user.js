const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constansts');
const utils = require('../utils');

var getUserByToken = function (token, additionalFields) {
  if (!token) {
    return Promise.reject(errors.authRequiredError);
  }
  return models.user.getUserByToken(token);
};

module.exports = {
  checkLogin: function (req, res, next) {
    var token = req.get('X-Access-Token') || req.query.access_token;
    getUserByToken(token).then(function (user) {
      req.registeredUser = user;
      next();
    }).catch(function (err) {
      console.log(err);
      return next(errors.authRequiredError);
    })
  },
  login: function (req, res, next) {
    models.user.login(req.body.authField, req.body.password)
      .then(function (user) {
        user.token = utils.getNewToken(user.id);
        res.json(user);
      }).catch(next);
  },
  createUser: function (req, res, next) {
    models.user.createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      language: req.body.language,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone
    }).then(function (user) {
        res.json(user);
      }
    ).catch(next);
  },
  getCurrentUser: function (req, res, next) {
    res.json(req.registeredUser);
  },
  getUsers: function (req, res, next) {
    var limit = Number(req.query.limit);
    limit = isNaN(limit) ? 10 : limit;
    var offset = Number(req.query.skip);
    offset = isNaN(offset) ? 0 : offset;
    models.user.getList({
      skip: offset,
      limit: limit,
      projection: constants.user.defaultFields
    }).then(function(users){
      res.json(users);
    }).catch(next);
  },
  registerDevice: function (req, res, next) {
    req.registeredUser.registerDevice(req.body.token, req.body.type)
    then(function () {
      res.status(204).send();
    }).catch(next);
  }
};

