import React,{useContext} from 'react'
import NoteContext from '../context/noteContext'
import NoteItem from './NoteItem'
const Notes = (props) => {
    const context=useContext(NoteContext)
    const {Notes,setNotes}=context
  return (
    <>
    <h1>YOUR NOTES</ h1>
    <div className='rows my-3'>
    {Notes.map((note)=>{
       return <NoteItem note={note}/>
    })}
    </div>
    </>
  )
}

export default Notes