import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutMutation } from "../../../redux/api/users_api";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import { logout } from "../../../redux/slices/authSlice";

const DropOnHover = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [logOut, { isLoading }] = useLogOutMutation();

  const handleLogout = async () => {
    await logOut();
    dispatch(logout());
    navigate("/");
  };

  if (isLoading || loading) {
    return <Modal modal={<Loader color="white" size="2xl" />} />;
  }

  return (
    <div className="invisible absolute group-hover:visible  w-60 h-52 text-sm -left-48 rounded shadow-sm border z-20 bg-white text-d1 transition-transform duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
      <div className="absolute -top-[22px] right-5 transform -translate-y-2 -translate-x-1/2 border-8 border-transparent border-b-white py-2"></div>

      {user ? (
        <div className="text-center mt-3">
          <h1 className="">
            Hello! <span className="text-pretty text-primary">{user.name}</span>
          </h1>
          <p className="mt-2 text-gray1 text-xs">Welcome to MegaMart</p>
        </div>
      ) : (
        <div className="mt-3 flex flex-col justify-center items-center  px-3">
          <Link
            to="/login"
            className="bg-primary text-white hover:underline mt-4 w-[80%] text-center py-1 rounded-md"
          >
            Login
          </Link>
          <span className="text-xs mt-2">
            New Here?{" "}
            <Link to="/register" className="text-secondary hover:underline">
              Create
            </Link>
          </span>
        </div>
      )}
      <div className="mt-3 border-t mx-8">
        <ul className="mt-3  ">
          <li className="mb-2 hover:text-primary hover:underline w-fit">
            <Link to="/account">Your Account</Link>
          </li>
          <li className="mb-2 hover:text-primary hover:underline w-fit">
            <Link>Your Orders</Link>
          </li>
          <li className="mb-2 hover:text-primary hover:underline w-fit">
            <Link>Wishlist</Link>
          </li>
          <li className=" hover:text-primary w-fit">
            {user && (
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropOnHover;
