

const Note = require("../models/noteModel");
const { refreshUserTags } = require("../utils/updateAllTags");

exports.displayTags = async (req, res) => {
  try {
    // get refresh tags
    const allTags = await refreshUserTags(req.user.id);

    res.status(200).json({
      success: true,
      message: "All Tags fetched successfully",
      allTags,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching All Tags.",
      error: err.message,
    });
  }
};
