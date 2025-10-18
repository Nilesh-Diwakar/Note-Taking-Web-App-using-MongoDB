
import React from 'react'
import NoteForm from './NoteForm'

function CreateNotes() {
  return (
    <div className='flex w-full h-full pb-10'>
        <div className="flex-1 lg:border-r lg:border-b border-[#e0e4ea]">
            <NoteForm />
        </div>
        <div className="hidden lg:block w-[200px]"></div>
    </div>
  )
}

export default CreateNotes
