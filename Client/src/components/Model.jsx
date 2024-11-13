import React, { useEffect, useState } from "react";

function Modal({ closeModel, addNote, currentNote, updateNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
      updateNote(currentNote._id,title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div>
      {/* Modal backdrop and content */}
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white p-6 w-80 max-w-full rounded-lg shadow-lg">
            {/* Close button */}
            <button
              onClick={closeModel}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold mb-4">
              {currentNote == null ? "Add New Note" : "Update Note"}
            </h2>

            {/* Title Input */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Description Input */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {currentNote == null ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Modal;
