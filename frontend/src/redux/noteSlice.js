
import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  refreshToggle: false,
  // notesData: localStorage.getItem("notesData")
  //   ? JSON.parse(localStorage.getItem("notesData"))
  //   : [],
  // tagsData: localStorage.getItem("tagsData")
  //   ? JSON.parse(localStorage.getItem("tagsData"))
  //   : [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    triggerRefresh: (state) => {
      state.refreshToggle = !state.refreshToggle;
    },
  },
});


export const { triggerRefresh } = noteSlice.actions;
export default noteSlice.reducer;

