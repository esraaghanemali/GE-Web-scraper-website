const express = require('express');
const userMiddleware = require('../middlewares/user');
const middleware = require('../middlewares/webScraper-constants');

const router = express.Router();

router.use(userMiddleware.checkLogin);



/**
 * @api {post} /users/login Login to the APP
 * @apiName userLogin
 * @apiGroup Users
 *
 * @apiParam (Body) {String} email The user's email
 * @apiParam (Body) {String} password The password
 *
 * @apiSuccess {User} user The logged in user info
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
 * "email" : "admin@admin.com",
 * "firstName" : "Admin",
 * "lastName" : "Admin",
 * "role" : "client",
 * "language" : "en",
 * "isActive" : false,
 * "phone" : ""0958446790",
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTc0ZThhNzJmMjg2N2FlMmNkNTcxNyIsImlhdCI6MTQ5NDg4Mjk4NX0.LlfZSHBUDSnS6qD8tXPjUJuJQAzCbkC-PbYOyDagyz8"
 * }
 * @apiError (Error: IncorrectCredentials 400) IncorrectCredentials The <code>username</code> or <code>password</code> is invalid.
 * @apiErrorExample {json} Incorrect Credentials
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "code": 106,
 *     "error": "number_password_incorrect"
 *   }
 * @apiError (Error: UserInactive 401) UserInactive The user is inactive.
 * @apiErrorExample {json} User Inactive
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "code": 304,
 *     "error": "user_inactive"
 *   }
 */
router.get('/', middleware.getAllWebScraperConstants)


/**
 * @api {post} /users/login Login to the APP
 * @apiName userLogin
 * @apiGroup Users
 *
 * @apiParam (Body) {String} email The user's email
 * @apiParam (Body) {String} password The password
 *
 * @apiSuccess {User} user The logged in user info
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
 * "email" : "admin@admin.com",
 * "firstName" : "Admin",
 * "lastName" : "Admin",
 * "role" : "client",
 * "language" : "en",
 * "isActive" : false,
 * "phone" : ""0958446790",
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTc0ZThhNzJmMjg2N2FlMmNkNTcxNyIsImlhdCI6MTQ5NDg4Mjk4NX0.LlfZSHBUDSnS6qD8tXPjUJuJQAzCbkC-PbYOyDagyz8"
 * }
 * @apiError (Error: IncorrectCredentials 400) IncorrectCredentials The <code>username</code> or <code>password</code> is invalid.
 * @apiErrorExample {json} Incorrect Credentials
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "code": 106,
 *     "error": "number_password_incorrect"
 *   }
 * @apiError (Error: UserInactive 401) UserInactive The user is inactive.
 * @apiErrorExample {json} User Inactive
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "code": 304,
 *     "error": "user_inactive"
 *   }
 */
router.get('/:webScraperConstantsId', middleware.getWebScraperConstantsById)
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
    .post('/:pagePrice/itemPerPagePrice', middleware.createWebScraperConstants)
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
    .put('/:webScraperConstantsId/pagePrice/itemPerPagePrice', middleware.updateWebScraperConstants)


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
    .delete('/:exrctedDataId', middleware.removeWebScraperConstantsById)

module.exports = router;
