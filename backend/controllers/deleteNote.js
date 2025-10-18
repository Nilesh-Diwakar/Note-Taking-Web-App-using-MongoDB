
const Note = require("../models/noteModel");
const { refreshUserTags } = require("../utils/updateAllTags");

exports.deleteNote = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedNote = await Note.findOneAndDelete({
      _id,
      user: req.user.id,
    });

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    // Refresh tags after deletion
    const allTags = await refreshUserTags(req.user.id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      allTags,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting note.",
      error: err.message,
    });
  }
};
