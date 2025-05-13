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
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-20 transform ${
          isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <img src={logo} alt="MegaMart Logo" className="h-6 object-contain" />
          <button
            onClick={close}
            className="text-gray-600 hover:text-primary text-2xl"
            aria-label="Close menu"
          >
            {cross}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 p-4 text-base font-medium text-gray-800">
          <Link
            to="/account"
            onClick={close}
            className="py-2 hover:text-primary transition-colors"
          >
            My Account
          </Link>
          <Link
            to="/orders"
            onClick={close}
            className="py-2 hover:text-primary transition-colors"
          >
            My Orders
          </Link>
          <Link
            to="/wishlist"
            onClick={close}
            className="py-2 hover:text-primary transition-colors"
          >
            Wishlist
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="py-2 text-left hover:text-primary transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={close}
              className="py-2 hover:text-primary transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-gray-900 z-10 ${
          isOpen ? "opacity-30 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out lg:hidden`}
      ></div>
    </div>
  );
};

export default MenuSideBar;
