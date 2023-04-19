const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communities.contoller');
const communitiesMid = require('../middlewares/communities.mid')
const usersController = require('../controllers/users.controller');
const usersMid = require('../middlewares/users.mid');
const claimsController = require('../controllers/claims.controller');
const claimsMid = require('../middlewares/claims.mid');

router.get('/communities', communitiesController.list);
router.post('/communities/', communitiesController.create);
// router.post('/communities/', communitiesController.join);
router.get('/communities/:id', communitiesMid.exists, communitiesController.detail);
router.patch('/communities/:id', communitiesMid.exists, communitiesController.update);
router.delete('/communities/:id', communitiesMid.exists, communitiesController.delete);

router.get('/users', usersController.list);
router.post('/users/', usersController.create);
router.get('/users/:id', usersMid.exists, usersController.detail);
// router.get('/users/:id/confirm', usersMid.exists, usersController.confirm);
router.patch('/users/:id', usersMid.exists, usersController.update);
router.delete('/users/:id', usersMid.exists, usersController.delete);

router.get('/communities/:id/claims', communitiesMid.exists, claimsController.list);
router.post('/communities/:id/claims', communitiesMid.exists, claimsController.create);
router.get('/communities/:id/claims/:claimId', communitiesMid.exists, claimsMid.exists, claimsController.detail);
router.delete('/communities/:id/claims/:claimId', communitiesMid.exists, claimsMid.exists, claimsController.delete);

module.exports = router;