
const mongoose = require("mongoose");

const allTagsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // each user has one "AllTags" document
  },
  tags: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("AllTags", allTagsSchema);
