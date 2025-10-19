import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import api from '../utils/api';
import formatDate from '../utils/formatDate';
import Pagination from './Pagination';

function AllTaggedNotes({tagName, archive}) {
    const [filteredNotes, setfilteredNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // how much note want to display at a time?

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes?tag=${tagName}&archive=${archive}&page=${page}&limit=${limit}`);
                setfilteredNotes(res.data.noteData);
                setTotalPages(res.data.totalPages);
                // console.log(res.data.noteData);
            } 
            catch (err) {
                console.error("Error fetching note:", err.response?.data || err.message);
            }
        };  
        
        fetchNote();
    }, [tagName, page]);
    
  return (
    <div className='w-full flex flex-col divide-y divide-neutral-300'>
        {
            filteredNotes.length > 0 ?
            (
                filteredNotes.map((obj) => (
                    <NavLink to={archive? `/archives/${obj._id}` : `/notes/${obj._id}`} key={obj._id} className="flex flex-col rounded-lg p-2 space-y-3">
                        <p className="font-semibold text-base">{obj?.title}</p>
                    
                        <div className="flex flex-wrap gap-1">
                            {
                                obj.tags.map((t, i) => (
                                    <span key={i} className="font-normal text-xs text-neutral-950 rounded bg-neutral-200 px-1.5 py-0.5">{t}</span>
                                ))
                            }
                        </div>
                        <span className="text-xs font-normal text-neutral-700">{formatDate(obj.updateDate)}</span>
                    </NavLink>
                ))
            ) :
            (
                <p className='text-neutral-950 bg-neutral-200 text-xs font-normal p-2 rounded-lg mt-1'>You don't have any notes yet. Start a new note to capture your thoughts and ideas.</p>
            )
        }
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  )
}

export default AllTaggedNotes
