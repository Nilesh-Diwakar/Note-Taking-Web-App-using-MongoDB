
import React from 'react'
import { NavLink, Outlet, useOutlet } from 'react-router-dom'
import Icons from '../icons';
import { useAuth } from '../context/AuthContext';

function Settings() {
    const outlet = useOutlet();
    const { logout, user } = useAuth();

  return (
    <div className='w-full h-full flex flex-col lg:flex-row'>
        {/* Left Side */}
        <div className={`flex flex-col px-4 md:px-8 lg:px-4 py-6 lg:py-5 min-w-[240px] bg-neutral-0 border-r border-neutral-200`}>
          
          <p className='mb-4 text-neutral-950 text-2xl font-bold lg:hidden'>Settings</p>
          
          <div className='p-2 flex gap-5 items-center'>
            <Icons.UserCircled className="w-13 shrink-0"/>
            <h1 className='text-neutral-950 text-xl font-semibold break-all'>{user.name}</h1>
          </div>
            <p className='text-blue-400 text-center text-base font-normal mt-1 px-2'>{user.email}</p>

          <div className='flex gap-2 my-3 p-2 items-center cursor-pointer rounded-md hover:bg-btn-hover' onClick={() => logout()}>
            <Icons.LogoOut />
            <p className='text-neutral-950 text-base font-medium'>Logout</p>
          </div>

          <ul className='border-t border-[#e0e4ea] pt-4'>
            <li>
              <NavLink to={"/settings/color-theme"} className={({ isActive }) =>`w-full flex gap-2 items-center overflow-hidden rounded-md p-2 text-left outline-none h-8 text-sm ${isActive?"bg-neutral-200" : ""}`}>
                {
                  ({ isActive }) => (
                    <>
                      <Icons.Sun className="w-4"/>
                      <p className='text-neutral-950 text-sm font-medium'>Color Theme</p>
                      <Icons.ArrowRight className={`ml-auto w-4 ${isActive ? "block" : "hidden"}`}/>
                    </>
                  )
                } 
              </NavLink>
            </li>
            <li>
              <NavLink to={"/settings/font-theme"} className={({ isActive }) =>`w-full flex gap-2 items-center overflow-hidden rounded-md p-2 text-left outline-none h-8 text-sm ${isActive?"bg-neutral-200" : ""}`}>
                {
                  ({ isActive }) => (
                    <>
                      <Icons.Font className="w-4"/>
                      <p className='text-neutral-950 text-sm font-medium'>Font Theme</p>
                      <Icons.ArrowRight className={`ml-auto w-4 ${isActive ? "block" : "hidden"}`}/>
                    </>
                  )
                } 
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className={`px-4 md:px-8 py-6 pb-20 lg:pb-0 lg:p-8 bg-neutral-0 w-full`}>
          <Outlet />
        </div>

    </div>
  )
}

export default Settings
