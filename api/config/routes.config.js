const express = require('express');
const router = express.Router();
const communitiesController = require('../controllers/communities.contoller');
const communitiesMid = require('../middlewares/communities.mid')
const usersController = require('../controllers/users.controller');
const usersMid = require('../middlewares/users.mid');
const claimsController = require('../controllers/claims.controller');
const claimsMid = require('../middlewares/claims.mid');
const secure = require('../middlewares/secure.mid');

router.get('/communities', communitiesController.list);
router.post('/communities/', secure.auth, communitiesController.create);
// router.post('/communities/', communitiesController.join);
router.get('/communities/:id', communitiesMid.exists, communitiesController.detail);
router.patch('/communities/:id', secure.auth, communitiesMid.exists, communitiesMid.checkManager, communitiesController.update);
router.delete('/communities/:id', secure.auth, communitiesMid.exists, communitiesMid.checkManager, communitiesController.delete);

router.get('/users', usersController.list);
router.post('/users/', usersController.create);
router.get('/users/:id', usersMid.exists, usersController.detail);
router.get('/users/:id/confirm', usersMid.exists, usersController.confirm);
router.patch('/users/:id', secure.auth, usersController.update);
router.delete('/users/:id', secure.auth, usersController.delete);

router.get('/communities/:id/claims', communitiesMid.exists, claimsController.list);
router.post('/communities/:id/claims', secure.auth, communitiesMid.exists, claimsController.create);
router.get('/communities/:id/claims/:claimId', secure.auth, communitiesMid.exists, claimsMid.exists, claimsController.detail);
router.delete('/communities/:id/claims/:claimId', secure.auth, communitiesMid.exists, claimsMid.exists, claimsController.delete);

router.post('/login', usersController.login)

module.exports = router;