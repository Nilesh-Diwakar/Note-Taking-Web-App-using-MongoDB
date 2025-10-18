
const express = require("express");
const router = express.Router();

// import controllers
const { displayNotes, getNoteById } = require("../controllers/displayNotes");
const { displayTags } = require("../controllers/displayTags");
const { createNote } = require("../controllers/createNote");
const { updateNote } = require("../controllers/updateNote");
const { archiveNote } = require("../controllers/archiveNote");
const { deleteNote } = require("../controllers/deleteNote");
const { auth } = require("../middlewares/auth");


// get all notes
router.get("/notes", auth, displayNotes);

// get all tags
router.get("/allTags", auth, displayTags);

// get specific note
router.get("/notes/:_id", auth, getNoteById);

// create new note
router.post("/notes/create", auth, createNote);

// update a note
router.put("/update/:_id", auth, updateNote);

// update a archive status
router.put("/archive/:_id", auth, archiveNote);

// delete a note
router.delete("/delete/:_id", auth, deleteNote);


//export
module.exports = router;

