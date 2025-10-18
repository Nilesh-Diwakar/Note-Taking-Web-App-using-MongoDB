
import React from 'react'
import AllSearchedNotes from './AllSearchedNotes'
import useSearchNotes from '../hooks/useSearchNotes';
import { useSearchParams } from 'react-router-dom';
import AllNotesCards from './AllNotesCards';
import Icons from '../icons';

function SmallDevicesSearch({archive}) {
    const {searchHandler} = useSearchNotes();
    const [searchParam, setSearchParam] = useSearchParams();
    const searchStr = searchParam.get("search") || "";

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Search</h1>               
      <form className='relative mb-10' onSubmit={(e) => searchHandler(e, archive)}>
          <input type="text" name='search' placeholder='Search by title, content, or tags...' className="h-9 w-full px-4 py-3 pl-10 bg-transparent font-normal border border-borderClr focus:border-neutral-950 rounded-md text-xs shadow-sm focus:outline-none placeholder:text-xs placeholder:font-normal"/>
          <button className='inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium focus:outline-none hover:bg-neutral-100 h-9 w-9 absolute left-0 hover:cursor-pointer'>
          <Icons.Search className='w-4'/>
          </button>
      </form>
      {
        searchStr === "true" ? 
        (
          <AllNotesCards archive={archive}/>
        ):
        (
          <AllSearchedNotes archive={archive}/>
        )
      }
    </div>
    
  )
}

export default SmallDevicesSearch
