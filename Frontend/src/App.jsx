import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {

  const [notes, setNotes] = useState([
  // {
  //   title:"test title",
  //   description:"test description"
  // },
  // {
  //   title:"test title",
  //   description:"test description"
  // },
  // {
  //   title:"test title",
  //   description:"test description"
  // },
  // {
  //   title:"test title",
  //   description:"test description"
  // }
  ])

  function fetchNotes(){
    axios.get('https://day9-des7.onrender.com/api/notes') /*Removed http://localhost:3000 because it runs locally but needs to be updated for the deployed URL (https://day9-des7.onrender.com) */
      .then((res)=>{
       setNotes(res.data.notes)
      })
  }
  

  useEffect(() => {
    fetchNotes()
  }, [])
  
  function handleSubmit(e){
    e.preventDefault()

    const {title,description} = e.target.elements

    console.log(title.value,description.value);

    axios.post("https://day9-des7.onrender.com/api/notes",{ /*Removed http://localhost:3000 because it runs locally but needs to be updated for the deployed URL (https://day9-des7.onrender.com) */
      title:title.value,
      description:description.value 
    })
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }

  function handleDeleteNote(noteId){
    axios.delete("https://day9-des7.onrender.com/api/notes/"+noteId) /*Removed http://localhost:3000 because it runs locally but needs to be updated for the deployed URL (https://day9-des7.onrender.com) */
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
  }

  return (
    <>

    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='Enter title' />
      <input name='description' type="text" placeholder='Enter description' />
      <button>Create Note</button>
    </form>

    <div className='notes'>
      {
        notes.map(note => {
          return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
          </div>
        })
      }
    </div>
    </>
  )
}

export default App
