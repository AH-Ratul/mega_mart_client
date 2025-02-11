import { BsCart } from "react-icons/bs";
import { FaFacebook, FaUser } from "react-icons/fa";
import {
  FaCartPlus,
  FaFacebookF,
  FaInstagram,
  FaLock,
  FaRightToBracket,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { IoPhonePortraitOutline, IoSearch } from "react-icons/io5";
import {
  MdAddShoppingCart,
  MdClose,
  MdDashboard,
  MdExpandMore,
  MdFavorite,
  MdHome,
  MdList,
  MdMenu,
  MdOutlineMailOutline,
  MdShoppingCart,
  MdShoppingCartCheckout,
} from "react-icons/md";

export const allIcons = {
  home: <MdHome />,
  dashboard: <MdDashboard />,
  cart: <MdShoppingCart />,
  cart2: <MdAddShoppingCart />,
  cart3: <BsCart />,
  account: <FaUser />,
  search: <IoSearch />,
  list: <MdList />,
  wish: <MdFavorite />,
  menu: <MdMenu />,
  expend: <MdExpandMore />,
  cross: <MdClose />,
  checkout: <MdShoppingCartCheckout />,
  login: <FaRightToBracket />,
  logout: <FiLogOut />,
  lock: <FaLock />,
  google: <FcGoogle />,
  phone: <IoPhonePortraitOutline />,
  facebook: <FaFacebook />,
  insta: <FaInstagram />,
  email: <MdOutlineMailOutline />,
  X: <FaXTwitter />,
  youtube: <FaYoutube />,
};
