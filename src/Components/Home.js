import React,{useContext} from 'react'
import NoteContext from '../context/noteContext'
function Home() {
  const context=useContext(NoteContext)
  const {Notes,setNotes}=context
  return (
    <>
    <div className='container my-3'>
    <h1>Add A Note</h1>
    <form method='post' action='' className='my-3'>
    <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
    </form>
    </div>
     <h1>YOUR NOTES</ h1>
     <h2>{Notes.map((note)=>{
        return note.title
     })}</h2>
  </>
  )
}

export default Home