import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const { addNote } = useContext(NoteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault(); // Prevent page reload

    // Prevent empty title or description
    if (!note.title.trim() || !note.description.trim()) {
     
      return;
    }

    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" }); 

   
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2 className="text-center">Add a Note</h2>
      <form autoComplete="off">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        <div className="d-flex justify-content-center">
  <button 
    type="button" 
    className="btn btn-primary" 
    onClick={handleClick}
  >
    Add Note
  </button>
</div>

      </form>
    </div>
  );
};

export default AddNote;

