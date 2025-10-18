
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../utils/api";
import formatDate from "../utils/formatDate";
import { useSelector } from "react-redux";

function AllNotesCards({archive}) {
    const [allNotes, setAllNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const refresh = useSelector((state) => state.note.refreshToggle);
    const limit = 5; // how much note want to display at a time?

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes?archive=${archive}&page=${page}&limit=${limit}`);
                setAllNotes(res.data.noteData);
                setTotalPages(res.data.totalPages);
                // console.log(res.data.noteData);
            } 
            catch (err) {
                console.error("Error fetching note:", err.response?.data || err.message);
            }
        };  
        
        fetchNote();
    }, [refresh, page]);

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

  return (
    <div className='w-full flex flex-col divide-y divide-neutral-300'>
        {
            allNotes.length > 0 ?
            (
                allNotes.map((obj) => (
                    <NavLink to={archive? `/archives/${obj._id}` : `/notes/${obj._id}`} key={obj._id} className="flex flex-col rounded-md p-2 space-y-3">
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

        {/* Pagination Controls */}
        {
            totalPages > 1 && 
            (
                <div className="flex justify-between items-center mt-3 text-sm">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg ${
                    page === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "text-sm font-medium text-neutral-0 bg-neutral-950 hover:bg-neutral-0/5 hover:text-neutral-950 hover:cursor-pointer hover:border-[1.5px] border-borderClr-hover"
                    }`}
                >
                    Prev
                </button>

                <p className="text-neutral-700 font-bold">
                    Page {page} of {totalPages}
                </p>

                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                    page === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "text-sm font-medium text-neutral-0 bg-neutral-950 hover:bg-neutral-0/5 hover:text-neutral-950 hover:cursor-pointer hover:border-[1.5px] border-borderClr-hover"
                    }`}
                >
                    Next
                </button>
                </div>
            )
        }
    </div>
  );

}

export default AllNotesCards;
