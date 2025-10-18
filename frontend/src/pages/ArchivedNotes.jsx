import React from 'react'
import { NavLink, Outlet, useOutlet, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import AllNotesCards from '../components/AllNotesCards';
import AllTaggedNotes from '../components/AllTaggedNotes';
import AllSearchedNotes from '../components/AllSearchedNotes';

function ArchivedNotes() {
  const outlet = useOutlet();
  const [searchParam, setSearchParam] = useSearchParams();
  const searchKey = Array.from(searchParam.keys())[0];
  const tagName = searchParam.get('tag');
  const archiveStatus = true;

  return (
    <div className='w-full h-full flex'>
        <div className={`${outlet ? "hidden lg:block" : "block"} w-full lg:max-w-[290px] border-r border-neutral-200`}>

          <div className='border-r border-neutral-200 px-8 pt-5'>
            <div className='pb-15'>
              {/* All NoteCards.jsx */}
              {
                searchKey === undefined &&
                <AllNotesCards archive={archiveStatus}/>
              }
              {
                searchKey === "tag" &&
                <AllTaggedNotes tagName={tagName} archive={archiveStatus}/>
              }
              {
                searchKey === "search" &&
                <AllSearchedNotes archive={archiveStatus}/>
              }
            </div>
          </div>
        </div>

        <div className={`${outlet ?"block" : "hidden lg:block"} h-full w-full`}>
            <Outlet />
        </div>
    </div>
  )
}

export default ArchivedNotes
