const express = require('express');
const middleware = require('../middlewares/modelFiles');
const userMiddleware = require('../middlewares/user');
const router = express.Router();

router.use(userMiddleware.checkLogin);

router.get('/', middleware.getModelFiles)
    .get('/:modelFileId', middleware.getModelFileById)
    .get('/:username', middleware.getModelFilesByUsername);

module.exports = router;