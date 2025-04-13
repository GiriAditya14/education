import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinVideoPage = () => {
  const [roomID, setRoomID] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomID.trim()) {
      navigate(`/room/${roomID}`);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-700 border-b border-gray-600">
        <h2 className="text-xl font-semibold text-white text-center">Join a Video Call</h2>
      </div>

      {/* Join Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-lg">
          <input
            placeholder="Enter Room ID"
            type="text"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:outline-none mb-4"
          />

          <button
            onClick={handleJoin}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinVideoPage;

