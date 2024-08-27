import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../socket/socket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { generateNewRoomID } from "../lib/utils";
import { Events } from "../types/events";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function HomeScreen() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [playerName, setPlayerName] = useLocalStorage<string>(
    "PLAYER_NAME",
    ""
  );

  useEffect(() => {
    if (!roomId) {
      const newID = generateNewRoomID();
      navigate(`/join/${newID}`);
    }
  }, [navigate, roomId]);

  useEffect(() => {
    function handleRoomJoined() {
      navigate(`/room/${roomId}`);
    }
    socket.on(Events.JOINED_GAME, handleRoomJoined);

    return () => {
      socket.off(Events.JOINED_GAME, handleRoomJoined);
    };
  });

  function handleEnterRoom() {
    socket.connect();
    socket.emit(Events.JOIN_ROOM, roomId);
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen p-5 flex-col">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="logo">{/* Logo here */}</div>
      <div className="flex flex-col gap-5">
        {/* {roomId && <h3>Current Room Id: {roomId}</h3>} */}
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Name</label>
          <input
            className="px-1 py-2 border border-gray-500 rounded-lg text-black"
            type="text"
            name="name"
            id="name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        {roomId && (
          <div className="flex flex-col gap-3">
            <label htmlFor="name">RoomId</label>
            <input
              className="px-1 py-2 border border-gray-500 rounded-lg text-black"
              type="text"
              name="name"
              id="name"
              value={roomId}
              disabled
            />
          </div>
        )}
        <button
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white rounded-full transition-colors duration-100"
          onClick={handleEnterRoom}
        >
          Join Game
        </button>
      </div>
    </div>
  );
}
