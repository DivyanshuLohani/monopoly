import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ErrorPage from "./pages/PageNotFound";
import GamePage from "./pages/GamePage";
import { GameProvider } from "./context/GameContext";
import MapGenerator from "./pages/GenerateBoard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/join/:roomId",
      element: <HomeScreen />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/room/:roomId",
      element: <GamePage />,
    },
    {
      path: "/generate",
      element: <MapGenerator />,
    },
  ]);
  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  );
}

export default App;
