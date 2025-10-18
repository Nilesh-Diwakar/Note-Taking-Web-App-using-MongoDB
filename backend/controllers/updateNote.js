
// import model
const Note = require("../models/noteModel");
const { refreshUserTags } = require("../utils/updateAllTags");

// business logic
exports.updateNote = async (req, res) => {
    try{
        const {_id} = req.params;
        // fetch data from req's body
        const {title, noteMessage, tags} = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id, user: req.user.id }, // ensure only the owner can edit
            {title, tags, noteMessage, updateDate: Date.now()}, 
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Either Note not found or you don't have permission to update it.",
            });
        }

        // Refresh tags after note updation
        const allTags = await refreshUserTags(req.user.id);

        res.status(200).json({
            success: true,
            message: "Note Updated Successfully",
            allTags,
            noteData: updatedNote,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while updating note.",
            error: err.message,
        })
    }
}
