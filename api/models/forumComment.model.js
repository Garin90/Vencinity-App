const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumCommentSchema = new Schema(
  {
    text: {
      type: String,
      required: "Text is required",
    },
    forumTopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumTopic",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

const ForumComment = mongoose.model("ForumComment", forumCommentSchema);
module.exports = ForumComment;