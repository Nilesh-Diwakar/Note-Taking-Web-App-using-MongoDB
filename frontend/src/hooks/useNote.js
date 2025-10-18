
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { triggerRefresh } from "../redux/noteSlice";

function useNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // **********************************************
  // ******* to validate notes requirements *******
  // **********************************************
  function validateNote(noteData) {
    let errs = {};
    const tagStr = Array.isArray(noteData.tags) ? noteData.tags.join(", ") : noteData.tags;

    if (!noteData.title.trim() || noteData.title.trim().length < 2) {
      errs.title = "Title must contain at least 2 characters";
    }
    if (!tagStr.trim() || tagStr.trim().length < 2) {
      errs.tag = "Tag must contain at least 2 characters";
    }
    if (!noteData.noteMessage.trim() || noteData.noteMessage.trim().length < 2) {
      errs.noteMessage = "Note must contain at least 2 characters";
    }
    return errs;
  }
  
  // **********************************************
  // ******* to Create the notes *******
  // **********************************************
  async function createHandler(e, noteData, setNoteData, setErrors) {
    e.preventDefault();
    const errs = validateNote(noteData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs); // show errors in UI
      return; // stop execution
    }

    // converting into arrays of strings and choose only of length 2 or more
    const tagsArray = noteData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 1);
    setErrors({ title: "", tag: "", noteMessage: "" }); // clear errors

    try{
        const payload = { ...noteData, tags: tagsArray };
  
        const res = await api.post("/notes/create", payload);
        if (res.data.success) {
          dispatch(triggerRefresh());
        }
        // console.log("Note created:", res.data);
  
        setNoteData({ id: "", title: "", tags: "", noteMessage: "", updateDate: "Not yet saved.", archive: false });
        navigate(`/notes/${res.data.noteData._id}`);
        toast.success("Note Created Successfuly");
      } 
      catch (error) {
        console.error("Create note error:", error.response?.data || error.message);
      }
  }

  // **********************************************
  // ******* to Update the notes *******
  // **********************************************
  async function updateHandler(e, noteId, noteData, setNoteData, setErrors) {
    e.preventDefault();
    const errs = validateNote(noteData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    // converting into arrays of strings and choose only of length 2 or more
    const tagsArray = noteData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 1);
    setErrors({ title: "", tag: "", noteMessage: "" });

    try {
      const payload = { ...noteData, tags: tagsArray };

      const res = await api.put(`/update/${noteId}`, payload);
      if (res.data.success) {
        dispatch(triggerRefresh());
      }

      // console.log("Note updated:", res.data);
      toast.success("Note Updated Successfuly");
    } 
    catch (error) {
      console.error("Update note error:", error.response?.data || error.message);
    }
  }
  
  return { createHandler, updateHandler };
}

export default useNote;
