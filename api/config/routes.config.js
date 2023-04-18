const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communities.contoller')

router.get('/communities', communitiesController.list);
router.get('/communities/:id', communitiesController.detail);
router.post('/communities/', communitiesController.create);
router.patch('/communities/:id', communitiesController.update);
router.delete('/communities/:id', communitiesController.delete);

module.exports = router;