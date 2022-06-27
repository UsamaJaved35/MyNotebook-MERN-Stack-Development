import React,{useContext,useState} from 'react'
import NoteContext from '../context/noteContext'
const AddNote = () => {
    const context=useContext(NoteContext)
    const {addNote}=context
    const [Note, setNote] = useState({title:"",description:"",tag:""})
    const handleSubmit=(e)=>{
        e.preventDefault()//page does not reload
    addNote(Note)
    }
    const onChange=(e)=>{
        setNote({...Note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add A Note</h1>
                <form  className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" type='text' id="description" name='description' rows="5" onChange={onChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-danger" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
export default AddNote