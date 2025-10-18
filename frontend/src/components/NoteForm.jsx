
import React, { useEffect, useState } from 'react'
import useNote from '../hooks/useNote';
import { NavLink } from 'react-router-dom';
import Icons from '../icons/index';

function NoteForm({ noteId, archiveStatus, existingNote }) {
    const {createHandler, updateHandler} = useNote();
    // console.log(noteId? `got id ${noteId}` : "no id");
    
    const [errors, setErrors] = useState({ title: "", tag: "", noteMessage: "" });
    const [noteData, setNoteData] = useState(
        { title:"", tags:"", updateDate:"Not yet saved.", noteMessage:"", archive:false}
    );

    // Set fetched note data when it becomes available
    useEffect(() => {
        if (existingNote) {
            setNoteData({
                title: existingNote.title || "",
                tags: existingNote.tags || "",
                noteMessage: existingNote.noteMessage || "",
                archive: existingNote.archive ?? false,
                updateDate: existingNote.updateDate || "Not yet saved.",
            });
        }
    }, [existingNote]);

    
    function changeHandler(e){
        setNoteData((prevData) => {
            return{
            ...prevData,
            [e.target.name]:e.target.value,
            }
        });
    };


  return (
    <form onSubmit={(e) =>noteId? updateHandler(e,  noteId, noteData, setNoteData, setErrors) : createHandler(e, noteData, setNoteData, setErrors)} className="h-full w-full py-4 flex flex-col">

        <div className='px-6'>
            <input type="text" name='title' value={noteData.title} placeholder='Enter a title...' className='w-full px-3 py-1 rounded-lg text-2xl font-bold h-9 focus:outline-none focus:border-[1.5px]' onChange={changeHandler}/>
            {
                errors.title && 
                (
                    <div className="flex gap-x-2">
                        <Icons.Exclamation />
                        <p className='text-[0.8rem] font-medium text-red-400'>{errors.title}</p>
                    </div>
                )
            }
            

            <div className='mt-3 flex items-center gap-x-2'>
                <div className='flex items-center py-1 gap-x-2 w-29 pr-15'>
                    <Icons.Tag className="w-4"/>
                    <p className='text-sm font-normal text-neutral-700'>Tags</p>
                </div>

                <input type="text" name='tags' value={noteData.tags} placeholder='Add tags separated by commas (e.g. Work, Planning)' className={`w-full text-xs font-normal ${noteId ? "focus:border-b-[1.5px]  h-auto" : "focus:border-[1.5px] h-9 px-3 py-1 rounded-md"} focus:outline-none`} onChange={changeHandler}/>
            </div>
            {
                errors.tag && 
                (
                    <div className="flex gap-x-2">
                        <Icons.Exclamation />
                        <p className='text-[0.8rem] font-medium text-red-400'>{errors.tag}</p>
                    </div>
                )
            }

            <div className={`${archiveStatus ? "flex" : "hidden"} items-center`}>
                <div className='flex items-center py-1 gap-x-2 w-29'>
                    <Icons.Status className="w-4"/>
                    <p className='text-sm font-normal text-neutral-700'>Status</p>
                </div>
                <span className='text-xs font-normal text-neutral-950'>Archived</span>
            </div>

            <div className='flex items-center'>
                <div className='flex items-center py-1 gap-x-2 w-29'>
                    <Icons.Clock className="w-4"/>
                    <p className='text-sm font-normal text-neutral-700'>Last Edited</p>
                </div>
                <span className='text-xs font-normal text-neutral-950'>{noteData.updateDate}</span>
            </div>
        </div>


        <div className="px-6 py-4 mt-3 flex-1 flex flex-col border-t border-[#e0e4ea]">
            <textarea name='noteMessage' value={noteData.noteMessage} placeholder='Start typing your note here...' className="flex-1 w-full resize-none rounded-md px-3 text-base font-normal leading-6 focus:border-[1.5px] focus:outline-none" onChange={changeHandler}/>
            {
                errors.noteMessage && 
                (
                    <div className="flex gap-x-2">
                        <Icons.Exclamation />
                        <p className='text-[0.8rem] font-medium text-red-400'>{errors.noteMessage}</p>
                    </div>
                )
            }
            
            <div className="mt-7">
                {
                    noteId ? 
                    (
                        <>
                        <button className="text-sm font-medium text-[#f8fafc] bg-blue-500 hover:bg-neutral-700 hover:text-neutral-50 hover:cursor-pointer px-4 py-2 rounded-lg mr-2">
                            Update
                        </button>
                        <NavLink to={"/"}>
                            <button className="text-sm font-medium text-[#0e121b] bg-[#e0e4ea] hover:bg-neutral-500 hover:text-neutral-950 hover:cursor-pointer px-4 py-2 rounded-lg">
                            Cancel
                            </button>
                        </NavLink>
                        </>
                    ) : 
                    (
                        <button className="text-sm font-medium text-neutral-0 bg-neutral-950 hover:bg-neutral-0/5 hover:text-neutral-950 hover:cursor-pointer hover:border-[1.5px] border-borderClr-hover px-4 py-2 rounded-lg">
                        Submit
                        </button>
                    )
                }
            </div>
            
        </div>
    </form>
  )
}

export default NoteForm

