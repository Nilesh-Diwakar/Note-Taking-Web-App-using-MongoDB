import React from 'react';
import { NavLink, Outlet, useOutlet } from 'react-router-dom';
import Icons from '../icons';
import DisplayTags from '../components/DisplayTags';
import useSearchNotes from '../hooks/useSearchNotes';
import { useSelector } from 'react-redux';

function NoteLayout({archiveNotes}) {
  const {darkMode} = useSelector((state) => state.theme);
  const outlet = useOutlet();
  const {searchHandler} = useSearchNotes();

  return (
    <div className='w-full lg:px-4 h-full flex'>
        {/* Left Side */}
        <div className={`${outlet ?"hidden lg:flex" : "flex"} flex-col gap-2 min-w-[240px] bg-neutral-0 fixed inset-y-0 border-r border-neutral-200 pr-4`}>

          <header className='w-full h-19 flex items-center justify-between py-3 px-4 bg-neutral-0'>
            <NavLink to={'/'} >
              {
                darkMode ?
                (<Icons.LogoDark />) :
                (<Icons.Logo />)
              }
            </NavLink>
          </header>

          <div className='flex flex-col gap-1 w-full'>
            <NavLink to={"/"} className={({ isActive }) =>`w-full flex gap-2 items-center overflow-hidden rounded-md p-2 text-left text-neutral-400 outline-none h-8 text-sm ${isActive?"bg-neutral-200" : ""}`}>
              {
                ({ isActive }) => (
                  <>
                    <Icons.Home />
                    <p>All Notes</p>
                    {
                      darkMode ?
                      (<Icons.ArrowRightDark className={`w-4 ml-auto ${isActive ? "block" : "hidden"}`}/>) :
                      (<Icons.ArrowRight className={`w-4 ml-auto ${isActive ? "block" : "hidden"}`}/>)
                    }
                  </>
                )
              } 
            </NavLink>

            <NavLink to={"/archives"} className={({ isActive }) =>`w-full flex gap-2 items-center overflow-hidden rounded-md p-2 text-left text-neutral-400 outline-none h-8 text-sm ${isActive?"bg-neutral-200" : ""}`}>
              {
                ({ isActive }) => (
                  <>
                    <Icons.Archive />
                    <p>Archive Notes</p>
                    {
                      darkMode ?
                      (<Icons.ArrowRightDark className={`w-4 ml-auto ${isActive ? "block" : "hidden"}`}/>) :
                      (<Icons.ArrowRight className={`w-4 ml-auto ${isActive ? "block" : "hidden"}`}/>)
                    }
                  </>
                )
              } 
            </NavLink>
          </div>

          <div className='mt-2 py-2 text-sm  border-t border-[#e0e4ea]'>
            <h2 className='mb-2 font-normal'>Tags</h2>
            {/* SHOW ALL TAGS :- */}
            <DisplayTags archiveNotes={archiveNotes}/>
          </div>
        </div>

        {/* Right Side */}
        <div className='w-full h-full lg:ml-60'>
          
          <header className='w-full h-19 hidden lg:flex items-center justify-between py-3 px-4 bg-neutral-0 border-b border-neutral-200'>
            <div className='flex-1 flex items-center justify-between px-3 py-2'>
              <h1 className='font-bold text-2xl'>{archiveNotes? "Archived Notes" : archiveNotes === false ? "All Notes" : "Settings" }</h1>
              <div className='flex items-center gap-4'>
                <form className='relative' onSubmit={(e) => searchHandler(e, archiveNotes)}>
                  <input type="text" name='search' placeholder='Search by title, content, or tags...' className="w-[300px] h-9 px-4 py-3 pl-10 bg-transparent font-normal border border-borderClr focus:border-neutral-950 rounded-md text-xs shadow-sm focus:outline-none placeholder:text-xs placeholder:font-normal"/>
                  <button className='inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium focus:outline-none hover:bg-neutral-100 h-9 w-9 absolute left-0 hover:cursor-pointer'>
                    <Icons.Search />
                  </button>
                </form>
                <NavLink to={"/settings"}>
                  <Icons.Setting />
                </NavLink>
              </div>
            </div>
          </header>
          
          <Outlet />
        </div>

      </div>
  )
}

export default NoteLayout
