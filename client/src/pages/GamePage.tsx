import { ToastContainer } from "react-toastify";
import Board from "../components/Board";
import "react-toastify/dist/ReactToastify.css";
import PlayerDisplay from "../components/Players/PlayerContainer";

export default function GamePage() {
  return (
    <div className="flex items-center relative p-5 gap-5">
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
      <div className="flex flex-col self-start w-1/5">
        <PlayerDisplay />
      </div>
      <Board />
      <div className="flex flex-col self-start w-1/5"></div>
    </div>
  );
}
