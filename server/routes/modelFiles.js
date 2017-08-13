const express = require('express');
const middleware = require('../middlewares/modelFiles');
const userMiddleware = require('../middlewares/user');
const router = express.Router();

router.use(userMiddleware.checkLogin);
router.delete('/:modelId',middleware.removeModeleById)

router.get('/', middleware.getModelFiles)
    .get('/model/:modelFileId', middleware.getModelFileById)
    .get('/User/', middleware.getModelFilesByUsername)
.get('/Admin/', middleware.getAdminModelFiles)
router.get('/analytic/', middleware.getModelFilesGroupedByCategory)

router.post('/', middleware.createModelFile)
router.post('/save/',middleware.saveModelFiles)
module.exports = router;