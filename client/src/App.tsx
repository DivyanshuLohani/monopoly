import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ErrorPage from "./pages/PageNotFound";
import GamePage from "./pages/GamePage";

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
      path: "room/:roomId",
      element: <GamePage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
