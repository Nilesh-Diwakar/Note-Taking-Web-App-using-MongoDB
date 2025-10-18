
// import model
const Note = require("../models/noteModel");
const { refreshUserTags } = require("../utils/updateAllTags");

// business logic
exports.createNote = async (req, res) => {
    try{
        // fetch data from req's body
        const {title, noteMessage, tags} = req.body;

        const createdNote = await Note.create({
            title, 
            tags, 
            noteMessage, 
            user: req.user.id, // link note to logged-in user
            updateDate: Date.now()
        });

        // Refresh tags after note creation
        const allTags = await refreshUserTags(req.user.id);

        res.status(200).json({
            success: true,
            allTags,
            noteData: createdNote,
            message: "Note Created Successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while creating note.",
            error: err.message,
        })
    }
}

