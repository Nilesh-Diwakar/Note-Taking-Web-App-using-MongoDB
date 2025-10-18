
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { triggerRefresh } from '../redux/noteSlice';

function useEditNote(noteId) {
    const navigation = useNavigate();
    const dispatch = useDispatch();

    // **********************************************
    // ******* to Archive/Unarchive the notes *******
    // **********************************************
    async function archiveHandler(setShowArchiveWarning, archiveStatus, setArchiveStatus){

        try {
            const payload = { archive: !archiveStatus };

            const res = await api.put(`/archive/${noteId}`, payload);
            
            if (res.data.success) {
                dispatch(triggerRefresh());
            }
            // console.log("Archive Status updated:", res.data);
        } 
        catch (error) {
            console.error("Update Archive Status error:", error.response?.data || error.message);
        }

        setShowArchiveWarning(false);
        archiveStatus ? toast.success("Unarchived Successfuly") : toast.success("Archived Successfuly");
        setArchiveStatus(!archiveStatus);
    }

    
    // ************************************
    // ******* to Delelte the notes *******
    // ************************************
    async function deleteHandler(){
        try {
            const res = await api.delete(`/delete/${noteId}`);
            
            if (res.data.success) {
                dispatch(triggerRefresh());
            }
            // console.log("Note Deleted");
        } 
        catch (error) {
            console.error("Delete note error:", error.response?.data || error.message);
        }

        navigation("/");
        toast.success("Deleted Successfuly")
    }


    return {archiveHandler, deleteHandler}
}

export default useEditNote
