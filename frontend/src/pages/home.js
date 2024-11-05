import React, { useState } from 'react';
import Navbar from '../components/navbar';
import NoteModel from '../components/noteModel';
import axios from 'axios';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () =>{
    setModalOpen(false);
  };

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
            closeModal();
          }
    }catch(error){
        console.log(error);
    }
  };
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar/>

      <button 
       onClick={()=>{setModalOpen(true)}}
       className='fixed right-4 bottom-4 bg-teal-500 text-2xl text-white font-bold p-4 rounded-full'>
        +
      </button>
      {isModalOpen && 
      <NoteModel 
       closeModal={closeModal}
       addNote={addNote}
       />}
    </div>
  )
}

export default Home