const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  home: {
    type: String,
    required: "Home identificator is required"
  },
  name: {
    type: String,
    required: true,
    minlength: [2, "User name needs at least 2 chars"]
  },
  lastName: {
    type: String,
    required: "Lastname is required",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "User email must be valid"]
  },
  confirm: {
    type: Boolean,
    default: process.env.USER_CONFIRMATION_REQUIRED === "false"
  },
  password: {
    type: String,
    required: 'Email is required',
    minlength: [8, "Password must be at least 8 chars"]
  },
  imageUrl: {
    type: String,
    default: "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png",
    match: [/^https?:\/\/.+\.(jpg|jpeg|png)$/, "Image URL must be valid"]
  },
  phoneNumber: {
    type: String
  },
  community: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "guest"],
    default: "guest"
  }
  
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

// userSchema.virtual("claims", {
//   ref: "Claims",
//   localField: "_id",
//   foreingField: "claim",
//   justOne: false,
// })

const User = mongoose.model('User', userSchema);
module.exports = User;