import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, ArrowRight } from 'lucide-react';
import Button from '../components/UI/Button';
import Card, { CardBody } from '../components/UI/Card';

const JoinVideoPage = () => {
  const [roomID, setRoomID] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomID.trim()) {
      navigate(`/room/${roomID}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && roomID.trim()) {
      handleJoin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join Video Call</h1>
          <p className="text-sm sm:text-base text-gray-600">Enter a room ID to start or join a session</p>
        </div>

        {/* Join Form Card */}
        <Card>
          <CardBody className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Room ID Input */}
              <div>
                <label 
                  htmlFor="roomID" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Room ID
                </label>
                <input
                  id="roomID"
                  placeholder="Enter Room ID"
                  type="text"
                  value={roomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200"
                  autoFocus
                />
                <p className="mt-2 text-sm text-gray-500">
                  Ask your teacher or student for the room ID
                </p>
              </div>

              {/* Join Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleJoin}
                disabled={!roomID.trim()}
              >
                <span className="flex items-center justify-center gap-2">
                  Join Room
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Make sure you have a stable internet connection for the best experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinVideoPage;

