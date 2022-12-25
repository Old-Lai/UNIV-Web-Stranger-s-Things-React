import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { 
    Root,
    NotFound,
    Register,
    Login,
    Posts,
    Profile
  } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "home",
        element: <Root />
      },
      {
        path: "posts",
        element: <Posts />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
 