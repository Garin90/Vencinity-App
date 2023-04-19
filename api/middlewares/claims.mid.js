const Claim = require('../models/claim.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  const claimId= req.params.claimId || req.params.id
  Claim.findById(claimId)
    .then((claim) => {
      if (claim) {
        req.claim = claim;
        next();
      } else {
        next(createError(404, 'Claim not found'))
      }
    })
    .catch(next);
}