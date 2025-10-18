import React from 'react'
import { useNavigate } from 'react-router-dom';

function useSearchNotes() {
    const navigation = useNavigate();

    function searchHandler(e, archiveNotes){
        e.preventDefault();
        const searchStr = e.target.search.value;
        const searchTag = e.target.search.value?.split(" ")[0];
        navigation(archiveNotes? `/archives?search=${searchStr}` : `/?search=${searchStr}`);
        // navigation(archiveNotes? `/archives?search=${searchStr.split(" ").join("+")}` : `/?search=${searchStr.split(" ").join("+")}`);
        e.target.reset();
        // console.log("printing in useSearchNotes:- ", { searchStr, searchTag });
    }

  return {searchHandler};
}

export default useSearchNotes
