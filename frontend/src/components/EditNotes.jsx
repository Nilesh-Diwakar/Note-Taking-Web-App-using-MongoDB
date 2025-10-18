
import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import useEditNote from '../hooks/useEditNote';
import NoteForm from './NoteForm';
import Icons from '../icons';
import { useEffect } from 'react';
import api from '../utils/api';
import formatDate from '../utils/formatDate';

function EditNotes() {
    const {noteId} = useParams();
    const [loading, setLoading] = useState(false);
    const [noteIdData, setNoteIdData] = useState(null);
    const [archiveStatus, setArchiveStatus] = useState(false);
    const {archiveHandler, deleteHandler} = useEditNote(noteId);
    const [showDeleteWarning , setShowDeleteWarning] = useState(false);
    const [showArchiveWarning , setShowArchiveWarning] = useState(false);
    
    // console.log("id from editNote.jsx ", noteId);

    useEffect(() => {
        const fetchNote = async () => {
            if (!noteId) return;

            setLoading(true);
            try {
                const res = await api.get(`/notes/${noteId}`);
                const note = res.data.noteData;

                if (!note) {
                    setNoteIdData(null); // No note found
                    setLoading(false);
                    return;
                }

                setNoteIdData({
                    title: note.title || "",
                    tags: note.tags?.join(", ") || "",
                    noteMessage: note.noteMessage || "",
                    archive: note.archive || false,
                    updateDate: note.updateDate ? formatDate(note.updateDate) : "Not yet saved.",
                });

                setArchiveStatus(note.archive || false);
                setLoading(false);
            } 
            catch (err) {
                console.error("Error fetching note:", err.response?.data || err.message);
            }
            setLoading(false);
        };
        
        fetchNote();
    }, [noteId]);


  return (
    <div className='w-full h-full lg:overflow-y-auto flex lg:pb-10'>
        <div className="flex-1 lg:border-r lg:border-b border-[#e0e4ea] pb-10">
            {
                loading ? 
                (
                    <div className='flex justify-center items-center h-full'>
                        <span className='loader'></span>
                    </div>
                ) : 
                (
                    !noteIdData ?
                    (
                        <div className='h-full flex flex-col justify-center items-center gap-y-4'>
                        <div className='flex justify-center items-center gap-x-2'>
                            <Icons.ErrorMark className="w-10"/>
                            <p>No Note Found.</p>
                        </div>
                        <NavLink to={"/"} className='text-base font-medium focus:outline-none mt-2 sm:mt-0 px-4 py-2 rounded-md bg-blue-500 hover:bg-neutral-950 text-white hover:text-neutral-0'>Return to Home</NavLink>
                        </div>
                    ) :
                    (
                        <>
                            <div className='flex justify-between items-center px-6 pt-2 lg:hidden'>
                                <NavLink to={"/"} className='flex items-center gap-x-2'>
                                    <Icons.ArrowLeft className="w-3"/>
                                    <p className='text-xs'>Go Back</p>
                                </NavLink>
                                <div className='flex gap-x-2 justify-center items-center'>
                                    <button className='border border-borderClr hover:border-borderClr-hover hover:bg-borderClr-hover rounded-sm py-2 px-3.5 hover:cursor-pointer' onClick={() =>setShowDeleteWarning(true)}>
                                        <Icons.Trash className="w-4"/>
                                    </button>
                                    
                                    <button className='border border-borderClr hover:border-borderClr-hover hover:bg-borderClr-hover rounded-sm py-2 px-3.5 hover:cursor-pointer' onClick={() =>setShowArchiveWarning(true)}>
                                        <Icons.Archive className='w-4'/>
                                    </button>
                                </div>
                            </div>

                            <NoteForm noteId={noteId} archiveStatus={archiveStatus} existingNote={noteIdData} />
                        </>
                    )


                )
            }
        </div>
        <div className="p-2 space-y-3 hidden lg:flex flex-col w-[200px]">
            <button className='inline-flex items-center gap-2 rounded-md text-sm font-medium focus:outline-none h-9 px-4 py-2 w-full justify-start hover:cursor-pointer border border-borderClr hover:bg-btn-hover hover:border-borderClr-hover' onClick={() =>setShowArchiveWarning(true)}>
                <Icons.Archive />
                <span className='text-neutral-950 text-sm font-normal'>{archiveStatus? "Unarchive Note" : "Archive Note"}</span>
            </button>
            <button className='inline-flex items-center gap-2 rounded-md text-sm font-medium focus:outline-none h-9 px-4 py-2 w-full justify-start hover:cursor-pointer border border-borderClr hover:bg-btn-hover hover:border-borderClr-hover' onClick={() =>setShowDeleteWarning(true)}>
                <Icons.Trash />
                <span className='text-neutral-950 text-sm font-normal'>Delete Note</span>
            </button>
        </div>

        {/*Archive warnings:- */}
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black/60 z-20 ${showArchiveWarning ? "" : "hidden"}`}>
            <div className='fixed top-[50%] translate-y-[-50%] w-full max-w-lg left-[50%] translate-x-[-50%] px-6 py-6 sm:rounded-lg space-y-5 shadow-lg z-20 bg-neutral-0'>
            <div className='flex gap-x-4'>
                <div className='p-2 rounded-lg bg-neutral-100 h-fit'>
                <Icons.Archive />
                </div>
                <div className='space-y-2 text-center sm:text-left'>
                <h2 className='text-xl font-semibold'>
                    {
                    archiveStatus? "Unarchive Note" : "Archive Note"
                    }
                </h2>
                <p className='text-base text-muted-foreground leading-5'>
                    {
                    archiveStatus? "Are you sure you want to Unarchive this note? You can find it in the Unarchived Notes section and restore it anytime." : "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
                    }
                </p>
                </div>
            </div>

            <div className='flex flex-col-reverse space-x-2 sm:flex-row sm:justify-end sm:space-y-2'>
                <button className='text-base font-medium hover:cursor-pointer focus:outline-none mt-2 sm:mt-0 bg-[#e0e4ea] text-[#0e121b] hover:bg-neutral-500 px-4 py-2 h-10 rounded-md' onClick={() => setShowArchiveWarning(false)} >Cancel</button>
                <button className='text-base font-medium hover:cursor-pointer focus:outline-none mt-2 sm:mt-0 px-4 py-2 h-10 rounded-md bg-blue-500 text-[#f8fafc] hover:bg-neutral-700 hover:text-neutral-50' onClick={() => archiveHandler( setShowArchiveWarning, archiveStatus, setArchiveStatus )}>
                {
                    archiveStatus? "Unarchive Note" : "Archive Note"
                }
                </button>
            </div>
            </div>
        </div>
        
        {/*Delete warnings:- */}
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-black/60 z-20 ${showDeleteWarning ? "" : "hidden"}`}>
            <div className='fixed top-[50%] translate-y-[-50%] w-full max-w-lg left-[50%] translate-x-[-50%] px-6 py-6 sm:rounded-lg space-y-5 shadow-lg z-20 bg-neutral-0'>
            <div className='flex gap-4'>
                <div className='p-2 rounded-lg bg-neutral-100 h-fit'>
                <Icons.Trash />
                </div>
                <div className='space-y-2 text-center sm:text-left'>
                <h2 className='text-xl font-semibold'>Delete Note</h2>
                <p className='text-base text-muted-foreground leading-5'>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
                </div>
            </div>

            <div className='flex flex-col-reverse space-x-2 sm:flex-row sm:justify-end sm:space-y-2'>                
                <button className='text-base font-medium hover:cursor-pointer focus:outline-none mt-2 sm:mt-0 bg-[#e0e4ea] text-[#0e121b] hover:bg-neutral-500 px-4 py-2 h-10 rounded-md' onClick={() => setShowDeleteWarning(false)} >Cancel</button>

                <button className='text-base font-medium hover:cursor-pointer focus:outline-none mt-2 sm:mt-0 px-4 py-2 h-10 rounded-md bg-red-500 text-[#f8fafc] hover:bg-neutral-700 hover:text-neutral-50' onClick={() => deleteHandler()}>Delete Note</button>
            </div>
            </div>
        </div>

    </div>
  )
}

export default EditNotes

