import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, theme } = props; // Ensure 'theme' is passed as a prop

    return (
        <div className="col-md-4">
            <div
                className="card my-2 mx-1"
                style={{
                    backgroundColor: theme === "dark" ? "#333" : "#fff",
                    color: theme === "dark" ? "#fff" : "#000",
                }}
            >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i
                            className="far fa-trash-alt mx-2"
                            onClick={() => deleteNote(note._id)}
                        ></i>
                        <i
                            className="far fa-edit mx-2"
                            onClick={() => updateNote(note)}
                        ></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
