const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const config = require('../config/config');
const errors = require('../utils/errors');
const userPackageModel = require('./user-package')
// const userPackageModel = require('./user-package')
var userSchema = new mongoose.Schema({
    userPackage : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userPackage'
    },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    // unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    default: 'en',
    enum: ['en', 'ar']
  },
  role: {
    type: 'String',
    enum: ['client', 'admin'],
    default: 'client'
  },

  devices: [String]
});

// Saves the user's password hashed (plain text password storage is not good)
userSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.statics.getUserByToken = function (token) {
  var model = this;
  return new Promise(function (resolve, reject) {
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
      if (err) {
        return reject(err);
      } else {
        return model.findById(decoded.id).populate(   {
            path: 'userPackage'
        })
          .then(function (user) {
            if (!user || !user.id) {
              return reject(errors.authRequiredError);
            }
            return resolve(user);
          });
      }
    });
  })

};
userSchema.statics.updateInfo = function (user,filed,value) {
    var thisModel = this;

    return new Promise(function (resolve, reject) {
        switch (filed){
            case'username': {

                thisModel.update({
                    _id: user._id}, {
                    username:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });
                break
            }
            case'firstName': {

                thisModel.update({
                    _id: user._id}, {
                    firstName:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });
                break
            }
            case'lastName': {

                thisModel.update({
                    _id: user._id}, {
                    lastName:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });
                break
            }
            case'phone': {

                thisModel.update({
                    _id: user._id}, {
                    phone:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });
                break
            }
            case'email': {

                thisModel.update({
                    _id: user._id}, {
                    email:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });
                break
            }
            case'password': {

                thisModel.update({
                    _id: user._id}, {
                    password:value
                }).then(function (data) {
                    resolve(data)

                }).catch(function (err) {
                    reject(err)
                });
                break
            }

        }




    })

}
userSchema.statics.changePackage = function (user,packageId) {
    var thisModel = this;

    return new Promise(function (resolve, reject) {
        userPackageModel.findOne({_id:packageId}).then(function (package) {
            thisModel.update({
                _id: user._id}, {
                userPackage:package
            }).then(function (data) {
             resolve(data)

            }).catch(function (err) {
                reject(err)
            });
        })

    })

}
userSchema.statics.createUser = function (user) {
  console.log(user)
  return this.create(user);
};

userSchema.statics.login = function (authField, password) {
  if (!authField || !password) {
    return Promise.reject(errors.users.incorrectCreds);
  }
  return this.findOne({
    $or: [{
      email: authField.toLowerCase().trim()
    }, {
      phone: authField.toLowerCase().trim()
    }, {
      username: authField.toLowerCase().trim()
    }]
  }).then(function (user) {
    if (!user) {
      return Promise.reject();
    }
    var isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return Promise.reject(errors.users.incorrectCreds);
    user = user.toObject();
    // don't return password !!!!!
    delete user.password;
    return user;
  });
}

userSchema.statics.createAdmin = function () {
  console.log("adminnnnnnnnnnnn")
    console.log('-------------------')
  
    var userModel = this;
  return this.findOne({
    username: 'admin'
  }).then(function (admin) {
    if (!admin) {

      return userModel.createUser({
        username: 'admin',
        email: 'admin@admin.com',
        password: '123456',
        firstName: 'Admin',
        lastName: 'Admin',
        role: 'admin',
        phone: '123456789',
        isActive: true,
          userPackage:'5981ed63aee770324ec6fa1b'
      });
    }
    return Promise.resolve();
  });
}

userSchema.methods.registerDevice = function (token) {
  var thisModels = this;
  return models.model('user').find({
    devices: token
  }).then(function (users) {
    // remove the token from all other users so we don't mix notifications for multiple users on the same device
    return Promise.each(users, function (user) {
      user.get('devices').remove(token);
      return user.save();
    });
  }).then(function () {
    return utils.registerDevice(token);
  }).then(function () {
    // save the device token with the user
    thisModels.get('devices').push(token);
    return thisModels.save();
  });
}

module.exports = mongoose.model('user', userSchema, 'user');
