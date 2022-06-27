import React,{useContext} from 'react'
import NoteContext from '../context/noteContext'
import NoteItem from './NoteItem'
const Notes = (props) => {
    const context=useContext(NoteContext)
    const {Notes,setNotes}=context
  return (
    <>
    <h1>YOUR NOTES</ h1>
    <div className='container'>
    <div className='row my-3'>
    {Notes.map((note)=>{
       return <NoteItem key={note._id} note={note}/>
    })}
    </div>
    </div>
    </>
  )
}
export default Notes