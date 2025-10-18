
// import model
const Note = require("../models/noteModel");
const { refreshUserTags } = require("../utils/updateAllTags");

// business logic to archive / unarchive
exports.archiveNote = async (req, res) => {
    try{
        const {_id} = req.params;
        // fetch data from req's body
        const {archive} = req.body;

        const archivedNote = await Note.findOneAndUpdate(
            { _id, user: req.user.id }, // ensure only the owner can edit
            {archive}, 
            { new: true }
        );

        if (!archivedNote) {
            return res.status(404).json({
                success: false,
                message: "Either Note not found or you don't have permission to change archive status.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Archive Status Updated Successfully",
            noteData: archivedNote,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while updating Archive Status.",
            error: err.message,
        })
    }
}
