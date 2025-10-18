
// import model
const Note = require("../models/noteModel");

// business logic to get all notes OR notes on basis of search/tag
exports.displayNotes = async (req, res) => {
    try{
        // fetch data from req's body
        const {archive , tag, search, page = 1, limit = 10} = req.query;

        const filter = { 
          // only logged-in user's note
          user: req.user.id 
        }; 

        filter.archive = archive === "true" ? true : false;
        
        if(tag) {
            // exact tag necessary
            filter.tags = tag;
        }
     
        if (search) {
            // check if searchQuery is present as substring
            const searchRegex = new RegExp(search, "i"); // 'i' = case-insensitive
            
            // first word of searchQuery => check if it is included in any tag
            const tagRegex = new RegExp(search.split(" ")[0], "i"); 
            
            filter.$or = [
                { title: searchRegex },
                { tags: tagRegex },
                { noteMessage: searchRegex }
            ];
        }

        // convert page/limit to numbers from strings
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        // how much note to skip, eg:- for page=3, skip 20 notes and display next 10 notes if limit =10 
        const skip = (pageNum - 1) * limitNum;

        // count total pages for pagination 
        const totalNotes = await Note.countDocuments(filter);

        const requireNoteData = await Note.find(filter)
        // .sort({ updateDate: -1 }) // latest first
        .sort({ title: 1 }) // sort in ascending (A → Z)
        .skip(skip)
        .limit(limitNum);
        
        // console.log("filter- ", filter);
        // console.log("Data- ", requireNoteData);
        res.status(200).json({
            success: true,
            noteData: requireNoteData,
            totalNotes,
            currentPage: pageNum,
            totalPages: Math.ceil(totalNotes / limitNum),
            message: "Note displayed Successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Error while displaying notes.",
            error: err.message,
        })
    }
}

// get particular note by _Id
exports.getNoteById = async (req, res) => {
  try {
    const noteId = req.params._id;

    // find note by _id and ensure it belongs to logged-in user
    const note = await Note.findOne({ _id: noteId, user: req.user.id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      noteData: note,
      message: "Note fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching note",
      error: err.message,
    });
  }
};

