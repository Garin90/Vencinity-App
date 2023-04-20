const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communitySchema = new Schema({
  name: {
    type: String,
    maxlength: [20, 'The community name max 20 chars']
  },
  address: {
    type: String,
    required: 'Community address is required'
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  facilities: [{
    type: String,
    enum: ["Paddle court", "Multipurpose room", "Gym"],
    minlength: [2, 'Community facilities needs at leat 2 chars']
  }],
  imageUrl: {
    type: String,
    match: [/^https?:\/\/.+\.(jpg|jpeg|png)$/, "Image URL must be valid"]
  },

}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }

  } 
});

communitySchema.virtual("claims", {
  ref: "Claim",
  localField: "_id",
  foreignField: "community",
  justOne: false,
})

communitySchema.virtual("neighbours", {
  ref: "User",
  localField: "_id",
  foreignField: "community",
  justOne: false,
})

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;

