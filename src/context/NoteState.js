import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial=[
            {
              "_id": "62b62d46a6e1f018031235d1",
              "user": "62b6245ae8b08d0bd504b66c",
              "title": "gays",
              "description": "me osama hu",
              "tag": "",
              "date": "2022-06-24T21:31:50.187Z",
              "__v": 0
            },
            {
              "_id": "62b62de9a6e1f018031235d6",
              "user": "62b6245ae8b08d0bd504b66c",
              "title": "bus yar",
              "description": "osama sultan",
              "tag": "non",
              "date": "2022-06-24T21:34:33.381Z",
              "__v": 0
            }
        ]
        const [Notes, setNotes] = useState(notesInitial)
return(
<NoteContext.Provider value={{Notes,setNotes}}>
    {props.children}
</NoteContext.Provider>
)}
export default NoteState;