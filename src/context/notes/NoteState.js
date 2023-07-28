import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
     
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYxMDljOTEyMGNlNTQ3YzAzYzY0In0sImlhdCI6MTY4OTc3NDcwNX0.czR2YA5xouCIVxylG73BlWUxy1oDJBzDPTUvsv47-Ck"
      },
      body: JSON.stringify({title,description, tag})
    });

    const json = await response.json();
    console.log(json);

    console.log("Adding a new note")
    const note = {
      "user": "64b56eff19c9120ce547c03c65",
      "title": title,
      "description": description,
      "tag": tag,
      "_id": "64bfb2e59c24f6b17cc87c9e",
      "date": "2023-07-25T11:32:53.492Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

    // Get all Notes
    const getNotes = async () => {
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYxMDljOTEyMGNlNTQ3YzAzYzY0In0sImlhdCI6MTY4OTc3NDcwNX0.czR2YA5xouCIVxylG73BlWUxy1oDJBzDPTUvsv47-Ck"
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
     
    }
  
  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYxMDljOTEyMGNlNTQ3YzAzYzY0In0sImlhdCI6MTY4OTc3NDcwNX0.czR2YA5xouCIVxylG73BlWUxy1oDJBzDPTUvsv47-Ck"
      }
        });
    const json = response.json();
    console.log(json)
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNTYxMDljOTEyMGNlNTQ3YzAzYzY0In0sImlhdCI6MTY4OTc3NDcwNX0.czR2YA5xouCIVxylG73BlWUxy1oDJBzDPTUvsv47-Ck"
      },
      body: JSON.stringify({title,description, tag})
    });
    const json = response.json();
    console.log(json)

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
break;
    }
    console.log(notes,id)
    setNotes(notes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;