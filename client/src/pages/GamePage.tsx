import { ToastContainer } from "react-toastify";
import Board from "../components/Board";
import "react-toastify/dist/ReactToastify.css";

export default function GamePage() {
  return (
    <div className="flex items-center relative">
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
      <Board />
    </div>
  );
}
