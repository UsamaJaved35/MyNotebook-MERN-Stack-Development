import React from 'react'

const NoteItem = (props) => {
    const { title, description } = props.note
    return (
        <div className='row'>
            <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
            </div>
        </div>
    )
}
export default NoteItem