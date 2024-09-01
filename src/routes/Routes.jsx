import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MyAccount from "../components/Profile/MyAccount";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

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
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
    ],
  },
]);
