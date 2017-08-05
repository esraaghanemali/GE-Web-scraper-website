const express = require('express');
const middleware = require('../middlewares/user');

const router = express.Router();

router.post('/login', middleware.login)
/**
 * @api {post} /users signup with email & password
 * @apiName UserSignup
 * @apiGroup Users
 *
 * @apiParam (Body) {String} firstName The user's first name
 * @apiParam (Body) {String} lastName The user's last name
 * @apiParam (Body) {String='en','ar'} language The user's language device, the default is <code>en</code>
 * @apiParam (Body) {String} email The user's email
 * @apiParam (Body) {String} password The password
 * @apiParam (Body) {String} phone The phone
 * @apiParamExample {json} Sample Params
 * {
 * "email" : "admin@admin.com",
 * "firstName" : "Admin",
 * "lastName" : "Admin",
 * "language" : "en",
 * "phone" : ""0958446790"
 * }
 *
 * @apiSuccess {User} user The logged in user
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 * {
 * "email" : "admin@admin.com",
 * "firstName" : "Admin",
 * "lastName" : "Admin",
 * "role" : "client",
 * "language" : "en",
 * "isActive" : false,
 * "phone" : "0958446790",
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTc0ZThhNzJmMjg2N2FlMmNkNTcxNyIsImlhdCI6MTQ5NDg4Mjk4NX0.LlfZSHBUDSnS6qD8tXPjUJuJQAzCbkC-PbYOyDagyz8"
 * }
 *
 * @apiError (Error: InvalidInput 400) MissingInfo <code>name</code>, <code>email</code>, <code>password</code> or are not specified.
 * @apiUse InvalidInputErrorExample
 * @apiUse EmailExistsError
 */
  .post('/', middleware.createUser);

//the rest need to check login first !!
router.use(middleware.checkLogin);

/**
 * @api {get} /users/me Get the logged in user
 * @apiName CMSGetMe
 * @apiGroup Users
 *
 * @apiUse AccessTokenParams
 * @apiSuccess {User} user The logged in user
 * @apiUse AuthRequiredError
 */
router.get('/me', middleware.getCurrentUser)
  /**
   * @api {get} /users Get list of users
   * @apiName UserList
   * @apiGroup Users
   *
   * @apiUse AccessTokenParams
   * @apiUse GetListParams
   * @apiSuccess {[User]} users The array of users
   * @apiSuccessExample {json} Success Response
   *   HTTP/1.1 200 OK
   *   {
   *     "data": [
   *       {
   *         "id": "5850f773d1418c1945a5fdcc",
   *         "firstName" : "Admin",
   *         "lastName" : "Admin",
   *         "email": "admin@admin.com",
   *         "role": "admin",
   *         "isActive": true
   *       }
   *     ],
   *     "count": 1
   *   }
   *
   * @apiUse AuthRequiredError
   */
  .get('/', middleware.getUsers)
  /**
   * @api {post} /api/users/register_device Register user to receive push
   * @apiName UserRegisterDevice
   * @apiGroup User
   *
   * @apiUse AccessTokenParams
   * @apiParam (Body) {String} token The token to register the device
   *
   * @apiSuccess {Null} response No response just 204 status code
   *
   * @apiUse AuthRequiredError
   */
  .get('/register_device', middleware.registerDevice);


module.exports = router;
