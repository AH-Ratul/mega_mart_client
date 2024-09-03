import React from "react";
import logo from "../../../../public/logo12.svg";
import { allIcons } from "../../../data/all-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { useLogOutMutation } from "../../../redux/api/users_api";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

const MenuSideBar = ({ isOpen, close }) => {
  const { cross } = allIcons;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut, { isLoading }] = useLogOutMutation();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await logOut();
    dispatch(logout());
    navigate("/");
  };

  if (isLoading || loading) {
    return <Modal modal={<Loader color="white" size="2xl" />} />;
  }

  return (
    <div>
      <div
        className={`fixed h-[100dvh] left-0 right-32 md:right-64 text-gray1 bg-white z-20 top-0 px-3 overflow-hidden inset-y-0 transform ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center pl-4 mt-2">
          <img src={logo} alt="logo" className="w-32 md:w-52 py-2" />
          <span
            onClick={close}
            className="hover:text-primary text-black text-3xl"
          >
            {cross}
          </span>
        </div>
        <div className=" mt-4 pl-5 md:pl-6 flex flex-col gap-2 text-lg md:text-xl">
          <Link to="/account" onClick={close} className="hover:text-primary">
            My Account
          </Link>
          <Link className="hover:text-primary">My Oreders</Link>
          <Link className="hover:text-primary">WishList</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-primary text-start"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={close} className="hover:text-primary">
              Login
            </Link>
          )}
        </div>
      </div>
      <div
        onClick={close}
        className={`fixed w-screen h-screen bg-gray-900 top-0 left-0 z-10 transform ${
          isOpen ? "opacity-30 visible" : "opacity-0 invisible"
        } transistion-opacity duration-500 ease-in-out`}
      ></div>
    </div>
  );
};

export default MenuSideBar;
