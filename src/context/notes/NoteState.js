import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState =  (props)=>{
   const notesInitial = [
    {
        "user": "64b56109c9120ce547c03c64",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "_id": "64bfb2e59c24f6b17cc87c9e",
        "date": "2023-07-25T11:32:53.492Z",
        "__v": 0
      },
    {
        "user": "64b56109c9120ce547c03c65",
        "title": "My Titlewe",
        "description": "Please wake up bhaii",
        "tag": "personhahhaha",
        "_id": "64bfb2e59c24f6b17cc87c9e",
        "date": "2023-07-25T11:32:53.492Z",
        "__v": 0
      }

   ]
   const [notes, setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;