import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyAccount from "../components/Profile/MyAccount";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "account",
        element: (
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
