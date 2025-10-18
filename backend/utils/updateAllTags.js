
const Note = require("../models/noteModel");
const AllTags = require("../models/allTagsModel");

// Rebuild the all-tags list for a user
async function refreshUserTags(userId) {
  // Get all notes' tags for that user
  const allNotes = await Note.find({ user: userId }).select("tags");

  // Flatten all tag arrays, filter out falsy values, and remove duplicates
  const uniqueTags = [
    ...new Set(allNotes.flatMap((note) => note.tags.filter(Boolean))),
  ];

  // Update or create AllTags document
  await AllTags.findOneAndUpdate(
    { user: userId },
    { tags: uniqueTags },
    { upsert: true, new: true }
  );

  return uniqueTags;
}

module.exports = { refreshUserTags };
