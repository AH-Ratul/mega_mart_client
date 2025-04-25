import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { lazy, Suspense } from "react";
import Modal from "../components/Shared/Modal/Modal";
import Loader from "../components/Shared/Loader/Loader";

// Lazy loaded pages
const HomePage = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const MyAccount = lazy(() => import("../components/Profile/MyAccount"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword/ResetPassword"));
const VerifyCode = lazy(() => import("../pages/VerifyCode/VerifyCode"));
const ProductDetails = lazy(() => import("../pages/ProductDetails/ProductDetails"));
const CartPage = lazy(() => import("../pages/Cart/CartPage"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const ContactInfo = lazy(() => import("../pages/Contact_Info/ContactInfo"));

//Suspense wrapper 
const loadable =(Component) => (
  <Suspense fallback={<Modal modal={<Loader size="40px" />}/>}>
    <Component />
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: loadable(HomePage),
      },
      {
        path: "login",
        element: loadable(Login),
      },
      {
        path: "register",
        element: loadable(Register),
      },
      {
        path: "account",
        element: (
          <PrivateRoute>
            {loadable(MyAccount)}
          </PrivateRoute>
        ),
      },
      {
        path: "forgetpassword",
        element: loadable(ForgetPassword),
      },
      {
        path: "verifyCode",
        element: loadable(VerifyCode),
      },
      {
        path: "resetPassword",
        element: loadable(ResetPassword),
      },
      {
        path: "details/:id/:name",
        element: loadable(ProductDetails),
      },
      {
        path: "shopping_cart",
        element: loadable(CartPage),
      },
      {
        path: "contact_information",
        element: ( 
          <PrivateRoute>
            {loadable(ContactInfo)}
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            {loadable(Checkout)}
          </PrivateRoute>
        ),
      }
    ],
  },
]);
