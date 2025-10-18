
import React from 'react'
import { NavLink, Outlet, useOutlet, useSearchParams } from 'react-router-dom'
import AllNotesCards from '../components/AllNotesCards';
import AllTaggedNotes from '../components/AllTaggedNotes';
import AllSearchedNotes from '../components/AllSearchedNotes';
import DisplayTags from '../components/DisplayTags';
import SmallDevicesSearch from '../components/SmallDevicesSearch';
import Icons from '../icons';

function AllNotes() {
    const outlet = useOutlet();
    const [searchParam, setSearchParam] = useSearchParams();
    const searchKey = Array.from(searchParam.keys())[0];
    const tagName = searchParam.get('tag');
    const archiveStatus = false;

  return (
    <div className='w-full h-full flex'>
        <div className={`${outlet ? "hidden lg:block" : "block"} w-full lg:max-w-[290px] border-r border-neutral-200`}>
            
            <div className='border-r border-neutral-200 px-8 pt-5'>
                <NavLink to="/notes/create" className='w-15 h-15 bg-blue-600 flex justify-center items-center rounded-full fixed bottom-20 right-5 lg:w-full lg:h-9 lg:bg-blue-500 lg:inline-flex lg:gap-2 lg:px-4 lg:py-2 lg:mb-4 lg:text-base lg:font-medium lg:focus:outline-none lg:rounded-3xl lg:static hover:bg-neutral-950 text-white hover:text-neutral-0'>
                    <p className="hidden lg:block">+ Create New Note</p>
                    <Icons.Plus className="block lg:hidden" />
                </NavLink>

                <div className='pb-15'>
                    {/* All NoteCards.jsx */}
                    {
                        searchKey === undefined &&
                        <AllNotesCards archive={archiveStatus}/>
                    }
                    {
                        searchKey === "tag" &&
                        (
                            tagName === "true" ? 
                            (
                                <div className='lg:hidden'>
                                    <p className='mb-3'>Tags</p>
                                    <DisplayTags archive={false}/>
                                </div>
                            ) : 
                            (
                                <AllTaggedNotes tagName={tagName} archive={archiveStatus}/>
                            )
                        )
                        
                    }
                    {
                        searchKey === "search" &&
                        <>
                            <div className='lg:hidden'>
                                <SmallDevicesSearch archive={archiveStatus}/>
                            </div>
                            <div className='hidden lg:block'>
                                <AllSearchedNotes archive={archiveStatus}/>
                            </div>
                        </>
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

export default AllNotes
