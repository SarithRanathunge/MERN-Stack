import React, { useEffect ,useState } from 'react';
import Navbar from '../components/navbar';
import NoteModel from '../components/noteModel';
import axios from 'axios';
import NoteCard from '../components/noteCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNote] =useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('')

  useEffect(()=>{
    fetchNotes();
  });

  useEffect(()=>{
    setFilteredNote(
      notes.filter(note => 
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  },[query, notes]);

  const fetchNotes = async () =>{
    try{
      const {data} = await axios.get("http://localhost:5000/api/note",{
        headers: {
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      setNotes(data.notes);
    }catch(error){
      console.log(error);
    }
  }
  
  const closeModal = () =>{
    setModalOpen(false);
  };

  const onEdit = (note) =>{
    setCurrentNote(note);
    setModalOpen(true);
  }

  const addNote = async (title, description) =>{
    try{
          const response = await axios.post(
              "http://localhost:5000/api/note/add",
              {title, description}, {
                headers: {
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              }
          );
          if(response.data.success){
            fetchNotes();
            closeModal();
          }
    }catch(error){
        console.log(error);
        alert(error);
    }
  };

  const deleteNote = async (id)=>{
    try{
      const response = await axios.delete(
          `http://localhost:5000/api/note/${id}`,
          {
            headers: {
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
      );
      if(response.data.success){
        toast.success("Note Deleted");
        fetchNotes();
      }
    }catch(error){
        console.log(error);
        alert(error);
    }
  }

  const editNote = async(id, title, description)=>{
    try{
      const response = await axios.put(
          `http://localhost:5000/api/note/${id}`,
          {title, description}, {
            headers: {
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
      );
      if(response.data.success){
        fetchNotes();
        closeModal();
      }
    }catch(error){
        console.log(error);
        alert(error);
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery}/>

      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
        { filteredNotes.length >0 ? filteredNotes.map(note =>(
          <NoteCard
           note={note}
           onEdit={onEdit}
           deleteNote={deleteNote}
          />
        )): <p>No notes</p>}
      </div>

      <button 
       onClick={()=>{setModalOpen(true)}}
       className='fixed right-4 bottom-4 bg-teal-500 text-2xl text-white font-bold p-4 rounded-full'>
        +
      </button>
      {isModalOpen && 
      <NoteModel 
       closeModal={closeModal}
       addNote={addNote}
       currentNote={currentNote}
       editNote={editNote}
       />}
    </div>
  )
}

export default Home