
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Icons from '../icons';
import api from '../utils/api';
import { useSelector } from 'react-redux';

function DisplayTags({archiveNotes}) {
    const [allTags, setAllTags] = useState([]);
    const refresh = useSelector((state) => state.note.refreshToggle);

    useEffect(() => {
      const fetchNote = async () => {
        try{
          const res = await api.get(`/allTags`);
          setAllTags(res.data.allTags);
          // console.log(res.data.allTags);
        } 
        catch (error) {
          console.error("Fetch All Tags error: ", error.response?.data || error.message);
        }
      };
        
      fetchNote();
    }, [refresh]);

  return (
    <ul className='space-y-1 divide-y divide-neutral-200 lg:divide-y-0'>
      {
        allTags.map((tag, i) => (
            <li key={i}>
                <NavLink to={archiveNotes? `/archives?tag=${tag}` : `/?tag=${tag}`} className="flex items-center gap-2 px-3 py-2">
                  <Icons.Tag />
                  <span className='text-sm font-medium text-neutral-700'>{tag}</span>
                </NavLink>
            </li>
        ))
      }
    </ul>
  )
}

export default DisplayTags
