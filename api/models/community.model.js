const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: {
    type: String,
    maxlength: [20, 'The community name max 20 chars']
  },
  adress: {
    type: String,
  },
  manager: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User"
  },
  facilities: [{
    type: String,
    minlength: [2, 'Community facilities needs at leat 2 chars']
  }],
  image: {
    type: String
  }

}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;

