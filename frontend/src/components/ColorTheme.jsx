import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColorTheme } from "../redux/themeSlice";
import toast from 'react-hot-toast';
import Icons from '../icons';

function ColorTheme() {
  const dispatch = useDispatch();
  const {selectedTheme} = useSelector((state) => state.theme);
  const [pendingTheme, setPendingTheme] = useState(selectedTheme);

  const themeHandler = () => {
    dispatch(setColorTheme(pendingTheme));
    toast.success("Theme Changed");
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-neutral-950 font-bold text-lg'>Color Theme</h1>
        <p className='text-sm font-medium text-neutral-700'>Choose your color theme:</p>
      </div>

      <div className='lg:max-w-[528px] flex flex-col gap-6'>
        <label htmlFor='theme-light' className='w-full p-4 flex justify-between items-center border border-neutral-200 rounded-xl hover:bg-neutral-200 cursor-pointer'>
          <div className='flex gap-2'>
            <div className='h-10 w-10 border rounded-xl border-neutral-200 grid place-items-center'>
              <Icons.Sun className="w-5"/>
            </div>
            <div>
              <h2 className='text-sm font-medium text-neutral-950'>Light Mode</h2>
              <p className='text-xs font-normal text-neutral-700'>Pick a clean and classic light theme</p>
            </div>
          </div>
          <input type="radio" name="select-theme" id='theme-light' value={"light"} checked={pendingTheme === "light"} className="peer appearance-none h-4 w-4 border rounded-full relative checked:after:content-[''] checked:after:w-3 checked:after:h-3 checked:after:bg-neutral-950 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2" onChange={(e) => setPendingTheme(e.target.value)}/>
        </label>
        
        <label htmlFor='theme-dark' className='w-full p-4 flex justify-between items-center border border-neutral-200 rounded-xl hover:bg-neutral-200 cursor-pointer'>
          <div className='flex gap-2'>
            <div className='h-10 w-10 border rounded-xl border-neutral-200 grid place-items-center'>
              <Icons.Moon className="w-5"/>
            </div>
            <div>
              <h2 className='text-sm font-medium text-neutral-950'>Dark Mode</h2>
              <p className='text-xs font-normal text-neutral-700'>Select a sleek and modern dark theme</p>
            </div>
          </div>
          <input type="radio" name="select-theme" id='theme-dark' value={"dark"} checked={pendingTheme === "dark"} className="peer appearance-none h-4 w-4 border rounded-full relative checked:after:content-[''] checked:after:w-3 checked:after:h-3 checked:after:bg-neutral-950 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2" onChange={(e) => setPendingTheme(e.target.value)}/>
        </label>

        <button onClick={themeHandler} className='inline-flex justify-center items-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none bg-blue-500 text-[#f8fafc] h-9 px-4 py-2 self-end hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer'>Apply Changes</button>
      </div>
    </div>
  )
}

export default ColorTheme
