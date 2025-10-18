
const mongoose = require("mongoose");

// route handler
const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    
        title: {
            type: String,
            required: true,
            trim: true,
        },
        
        tags: [
            {
                type: String,
                trim: true,
            }
        ],

        noteMessage: {
            type: String,
            required: true,
        },

        archive: {
            type: Boolean,
            default: false,
        },

        updateDate: {
            type: Date,
            default: Date.now,
        },
    },
);

// export
module.exports = mongoose.model("Note", noteSchema);

