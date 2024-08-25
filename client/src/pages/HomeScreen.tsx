import { useLocation, useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;
  const pathList = pathName.split("/");
  const roomId = pathList.length > 1 ? pathList[2] ?? "" : "";

  return (
    <div className="flex items-center justify-center h-screen w-screen p-5 flex-col">
      <div className="logo">{/* Logo here */}</div>
      <div className="flex flex-col gap-5">
        {roomId && <h3>Current Room Id: {roomId}</h3>}
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Name</label>
          <input
            className="px-1 py-2 border border-gray-500 rounded-lg"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white rounded-full transition-colors duration-100"
          onClick={() => navigate("/room/jllsdka")}
        >
          Join Game
        </button>
      </div>
    </div>
  );
}
