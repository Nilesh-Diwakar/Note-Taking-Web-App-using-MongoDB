
import React from 'react'

function Pagination({page, totalPages, setPage}) {
    
    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

  return (
    <div>
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
  )
}

export default Pagination
