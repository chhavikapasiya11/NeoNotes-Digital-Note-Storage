import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Use useNavigate instead of useHistory
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
    const { notes, getNotes, editNote } = useContext(noteContext);
    const navigate = useNavigate(); // ✅ React Router v6 navigation
    const { showAlert } = props;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login"); // ✅ Redirect to login if no token
        } else {
            getNotes(); // ✅ Fetch notes if logged in
        }
    }, [ getNotes]);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    };

    const handleClick = () => { 
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    
        if (typeof showAlert === "function") {
            showAlert("Updated successfully", "success");
        } else {
            console.error("showAlert is not a function:", showAlert);
        }
    };
    
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
          <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2 className="text-center">Your Notes</h2>
                <div>
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => (
                    <NoteItem key={note._id} updateNote={updateNote}  note={note} />
                ))}
            </div>
        </>
    );
};

export default Notes;
