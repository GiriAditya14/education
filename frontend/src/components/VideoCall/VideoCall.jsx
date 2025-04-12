import { useEffect, useRef, useState } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import zegoService from '../../services/zego';
import { useAuth } from '../../context/AuthContext';

const VideoCall = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [error, setError] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const zegoRef = useRef(null);
  const { user, token } = useAuth();

  useEffect(() => {
    return () => {
      if (zegoRef.current) {
        zegoRef.current.destroyEngine();
      }
    };
  }, []);

  const initializeZego = async () => {
    try {
      const { appId, userId, token: zegoToken } = await zegoService.getZegoToken(token);

      const zg = new ZegoExpressEngine(appId, process.env.REACT_APP_ZEGO_SERVER_SECRET);
      zegoRef.current = zg;

      zg.on('roomStreamUpdate', async (roomID, updateType, streamList) => {
        if (updateType === 'ADD') {
          for (const stream of streamList) {
            const streamID = stream.streamID;
            if (streamID !== `${userId}_stream`) {
              const remoteStream = await zg.startPlayingStream(streamID);
              setRemoteStream(remoteStream);
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
              }
            }
          }
        } else if (updateType === 'DELETE') {
          setRemoteStream(null);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
        }
      });

      setIsInitialized(true);
    } catch (err) {
      setError('Failed to initialize video call');
      console.error(err);
    }
  };

  const startCall = async () => {
    try {
      const zg = zegoRef.current;
      const { userId } = await zegoService.getZegoToken(token);

      // Login to room
      await zg.loginRoom('education_room', userId, { token: zegoToken }, { userUpdate: true });

      // Start publishing stream
      const localStream = await zg.createStream({
        camera: { video: true, audio: true },
      });
      setLocalStream(localStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      await zg.startPublishingStream(`${userId}_stream`, localStream);
      setIsCallStarted(true);
    } catch (err) {
      setError('Failed to start call');
      console.error(err);
    }
  };

  const endCall = async () => {
    const zg = zegoRef.current;
    if (zg) {
      if (localStream) {
        await zg.stopPublishingStream(`${user._id}_stream`);
        zg.destroyStream(localStream);
        setLocalStream(null);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = null;
        }
      }
      await zg.logoutRoom('education_room');
      setIsCallStarted(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-6 text-white">Video Call</h3>
      {error && <div className="mb-4 p-2 bg-red-600 text-white rounded-md">{error}</div>}
      
      {!isInitialized ? (
        <button
          onClick={initializeZego}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Initialize Video Call
        </button>
      ) : !isCallStarted ? (
        <button
          onClick={startCall}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Start Call
        </button>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-gray-300 mb-2">You</h4>
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-auto bg-gray-700 rounded-md"
              />
            </div>
            <div>
              <h4 className="text-gray-300 mb-2">Teacher/Student</h4>
              <video
                ref={remoteVideoRef}
                autoPlay
                className="w-full h-auto bg-gray-700 rounded-md"
              />
            </div>
          </div>
          <button
            onClick={endCall}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;