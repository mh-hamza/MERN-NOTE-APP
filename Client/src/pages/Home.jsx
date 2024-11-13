import React, { useEffect, useState } from "react";
import Modal from "../components/Model.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../components/Card.jsx";
import Hero from "../components/Hero.jsx";
import { useAuth } from "../context/ContextProvider";

function Home() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const modelOpen = () => {
    setIsModelOpen(true);
  };
  const closeModel = () => {
    setIsModelOpen(false);
    setCurrentNote(null);
  };
  const fetchedNotes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        console.log(response.data.notes);
        console.log(response.data.message);
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchedNotes();
  }, []);
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/note/addNote`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response);
        toast.success(response.data.message);
        fetchedNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        fetchedNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        fetchedNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (id) => {
    setCurrentNote(id);
    setIsModelOpen(true);
  };

  const { user } = useAuth(); 
  if (!user) return <Hero />;
  return (
    <div>
      <div className="notescontainer max-w-screen-xl m-auto flex flex-wrap gap-3 justify-center mt-4">
        {notes.length !== 0 && notes ? (
          notes.map((note) => (
            <Card
              key={note._id}
              note={note}
              deleteNote={deleteNote}
              modelOpen={modelOpen}
              onEdit={onEdit}
            />
          ))
        ) : (
          <p>You don't have any notes</p>
        )}
      </div>
      <button
        onClick={modelOpen}
        className="fixed bottom-6 right-6 bg-blue-600 text-white text-3xl w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
      >
        +
      </button>
      {isModelOpen ? (
        <Modal
          closeModel={closeModel}
          addNote={addNote}
          updateNote={updateNote}
          currentNote={currentNote}
        />
      ) : null}
    </div>
  );
}

export default Home;
