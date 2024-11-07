import React, {useEffect, useState} from 'react'


const NoteModel = ({closeModal, addNote, currentNote}) => {
    const [title, setTitle] =useState('');
    const [description, setDescription] =useState('');

    useEffect(()=>{
      if(currentNote){
        setTitle(currentNote.title);
        setDescription(currentNote.description);
        console.log(currentNote.title)
        console.log(currentNote.description)
      }
    },[currentNote])

    const handleSubmit = async (e)=>{
      e.preventDefault();
      if(currentNote){
        
      }else{
        addNote(title, description);
      }
      
    };
    
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">{currentNote ? "Edit Note" : "Add New Note"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"
          />
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'>
            {currentNote ? "Edit Note" : "Add Note"}
          </button>
          <button
            className='mt-4 ml-[25px] text-red-500'
            onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>

  )
}

export default NoteModel