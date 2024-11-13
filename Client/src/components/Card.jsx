import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Card({ note,deleteNote, onEdit}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-80 max-w-full border border-gray-200">
     
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">{note.title}</h3>
        <div className="flex space-x-2">
          {/* Edit Button */}
          <button onClick={()=>onEdit(note)} className="text-blue-500 hover:text-blue-700 transition-colors">
            <FaEdit size={20} />
          </button>
          {/* Delete Button */}
          <button onClick={()=>deleteNote(note._id)} className="text-red-500 hover:text-red-700 transition-colors">
            <FaTrash size={20} />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{note.description}</p>
    </div>
  );
}

export default Card;
