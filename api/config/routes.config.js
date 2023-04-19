const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communities.contoller');
const communitiesMid = require('../middlewares/projects.mid')

router.get('/communities', communitiesController.list);
router.post('/communities/', communitiesController.create);
// router.post('/communities/', communitiesController.join);
router.get('/communities/:id', communitiesMid.exists, communitiesController.detail);
router.patch('/communities/:id', communitiesMid.exists, communitiesController.update);
router.delete('/communities/:id', communitiesMid.exists, communitiesController.delete);

module.exports = router;