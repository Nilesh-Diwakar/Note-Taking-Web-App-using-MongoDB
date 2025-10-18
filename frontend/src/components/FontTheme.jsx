import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Icons from '../icons';
import toast from 'react-hot-toast';
import { setFontTheme } from '../redux/themeSlice';

function FontTheme() {
  const dispatch = useDispatch();
  const {selectedFont} = useSelector((state) => state.theme);
  const [pendingFont, setPendingFont] = useState(selectedFont);

  const themeHandler = () => {
    dispatch(setFontTheme(pendingFont));
    toast.success("Font-family Changed");
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-neutral-950 font-bold text-lg'>Font Theme</h1>
        <p className='text-sm font-medium text-neutral-700'>Choose your font theme:</p>
      </div>

      <div className='lg:max-w-[528px] flex flex-col gap-6'>
        <label htmlFor='theme-sans-serif' className='w-full p-4 flex justify-between items-center border border-neutral-200 rounded-xl hover:bg-neutral-200 cursor-pointer'>
          <div className='flex gap-2'>
            <div className='h-10 w-10 border rounded-xl border-neutral-200 grid place-items-center'>
              <Icons.FontSansSerif className="w-5"/>
            </div>
            <div>
              <h2 className='text-sm font-medium text-neutral-950'>Sans Serif</h2>
              <p className='text-xs font-normal text-neutral-700'>Clean and modern, easy to read.</p>
            </div>
          </div>
          <input type="radio" name="select-theme" id='theme-sans-serif' value={"sans-serif"} checked={pendingFont === "sans-serif"} className="peer appearance-none h-4 w-4 border rounded-full relative checked:after:content-[''] checked:after:w-3 checked:after:h-3 checked:after:bg-neutral-950 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2" onChange={(e) => setPendingFont(e.target.value)}/>
        </label>
        
        <label htmlFor='theme-noto-serif' className='w-full p-4 flex justify-between items-center border border-neutral-200 rounded-xl hover:bg-neutral-200 cursor-pointer'>
          <div className='flex gap-2'>
            <div className='h-10 w-10 border rounded-xl border-neutral-200 grid place-items-center'>
              <Icons.FontSerif className="w-5"/>
            </div>
            <div>
              <h2 className='text-sm font-medium text-neutral-950'>Noto Serif</h2>
              <p className='text-xs font-normal text-neutral-700'>Classic and elegant for timeless feel.</p>
            </div>
          </div>
          <input type="radio" name="select-theme" id='theme-noto-serif' value={"noto-serif"} checked={pendingFont === "noto-serif"} className="peer appearance-none h-4 w-4 border rounded-full relative checked:after:content-[''] checked:after:w-3 checked:after:h-3 checked:after:bg-neutral-950 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2" onChange={(e) => setPendingFont(e.target.value)}/>
        </label>
        
        <label htmlFor='theme-monospace' className='w-full p-4 flex justify-between items-center border border-neutral-200 rounded-xl hover:bg-neutral-200 cursor-pointer'>
          <div className='flex gap-2'>
            <div className='h-10 w-10 border rounded-xl border-neutral-200 grid place-items-center'>
              <Icons.FontMonospace className="w-5"/>
            </div>
            <div>
              <h2 className='text-sm font-medium text-neutral-950'>Monospace</h2>
              <p className='text-xs font-normal text-neutral-700'>Code-like, great for technical vibe.</p>
            </div>
          </div>
          <input type="radio" name="select-theme" id='theme-monospace' value={"monospace"} checked={pendingFont === "monospace"} className="peer appearance-none h-4 w-4 border rounded-full relative checked:after:content-[''] checked:after:w-3 checked:after:h-3 checked:after:bg-neutral-950 checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2" onChange={(e) => setPendingFont(e.target.value)}/>
        </label>

        <button onClick={themeHandler} className='inline-flex justify-center items-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none bg-blue-500 text-[#f8fafc] h-9 px-4 py-2 self-end hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer'>Apply Changes</button>
      </div>
    </div>
  )
}


export default FontTheme
