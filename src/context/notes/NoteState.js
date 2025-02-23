import NoteContext from "./NoteContext";
import { useState, useEffect } from "react";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const [notes, setNotes] = useState([]);

  const getAuthToken = () => localStorage.getItem("token");

  //  Get all Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchusernotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": getAuthToken(),
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch notes:", response.statusText);
        return;
      }

      const json = await response.json();
      if (Array.isArray(json)) {
        setNotes(json);
      } else {
        console.error("Invalid notes data:", json);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  //  Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": getAuthToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Failed to add note:", response.statusText);
        return;
      }

      const note = await response.json();
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  //  Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": getAuthToken(),
        },
      });

      if (!response.ok) {
        console.error("Failed to delete note:", response.statusText);
        return;
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //  Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": getAuthToken(),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Failed to update note:", response.statusText);
        return;
      }

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  //  Load notes when component mounts
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
