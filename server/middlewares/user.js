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

    getUsersGroupedByPackages: function (req, res, next) {

    models.user.getUsersGroupedByPackages().then(
        function(packages){
            models.userPackage.find({})
                .then(function (userPackages) {
                for(var i=0 ; i<packages.length;i++)
                {
                    var package = userPackages.find(function (array) {
                        return JSON.stringify(array._id)===
                            JSON.stringify(packages[i]._id)
                    })
                    packages[i]._id=package.packageName
                    packages[i].username=packages[i].username.length

                }
                    res.json(packages);

            })

        }).catch(next);
},
    analyseUsers: function (req, res, next) {
var result = {
    users : [],
    packages : [],
    models :[],
    requests: []
}
        models.user.find({}).populate('userPackage').then(
            function(users){
                // console.log('userss: '+users.length)

                models.scraperRequest.getRequestsGroupedByUser()
                    .then(function (requests) {

                        models.model.getModelFilesGroupedByUser()
                            .then(function (models) {
// console.log("the returned models")
//                                 console.log(    models)
                                for(var i = 0 ; i<users.length;i++)
                                {
var userModels;
                                    var userModels = models
                                        .find(function (modelsarray) {
                                            return  JSON.stringify(modelsarray._id)
                                    ===  JSON.stringify(users[i]._id)
                                        })

                                    var userRequests = requests
                                        .find(function (array) {
                                           return JSON.stringify(array._id)===
                                               JSON.stringify(users[i]._id)
                                    })
                                    result.users.push(users[i].username)
                                    result.packages
                                        .push(users[i].userPackage.totalPrice)
                                    if(!userModels || !userModels.files)
                                    result.models
                                        .push(0)
                                    else
                                    {
                                        result.models
                                            .push(userModels.files.length)
                                    }
                                    if(!userRequests || !userRequests.requests)
                                    result.requests
                                        .push(0)
                                    else
                                    {
                                        result.requests
                                            .push(userRequests.requests.length)
                                    }

                                }
                                res.json(result);
                            })
                    })

            }).catch(next);
    },
  createUser: function (req, res, next) {
    // console.log("paccc")
      // console.log( req.body.userPackage._id)

    models.user.createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      language: req.body.language,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
        userPackage:  req.body.userPackage,
      phone: req.body.phone
    }).then(function (user) {
        res.json(user);
      }
    ).catch(next);
  },
    changePackage: function (req, res, next) {
        models.user.changePackage(req.registeredUser,req.body.packageId)
            .then(function (user) {

                res.json(user);
            }
        ).catch(next);
    },
    updateInfo: function (req, res, next) {
    models.user.updateInfo(req.registeredUser,req.body.filed,req.body.value)
        .then(function (user) {

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
        populate: [
            {
                path: 'userPackage'
            }
        ],
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

