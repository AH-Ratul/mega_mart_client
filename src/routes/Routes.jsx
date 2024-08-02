import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
        ]
    }
])