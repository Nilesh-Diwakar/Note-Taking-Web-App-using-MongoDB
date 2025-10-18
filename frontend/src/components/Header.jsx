import React from 'react'
import icons from '../icons/index'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Icons from '../icons/index';

function Header() {
  const {darkMode} = useSelector((state) => state.theme);
  return (
    <header className='w-full bg-neutral-100 flex lg:hidden items-center justify-between px-4 py-3 md:px-8 md:py-6'>

      <NavLink to={'/'} >
        {
          darkMode ? 
          <Icons.LogoDark /> : 
          <Icons.Logo />
        }
      </NavLink>
    </header>
  )
}

export default Header
