import { BsCart } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaCartPlus, FaLock, FaRightToBracket } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoPhonePortraitOutline } from "react-icons/io5";
import {
  MdClose,
  MdDashboard,
  MdExpandMore,
  MdFavorite,
  MdHome,
  MdList,
  MdMenu,
  MdSearch,
  MdShoppingCart,
  MdShoppingCartCheckout,
} from "react-icons/md";

export const allIcons = {
  home: <MdHome />,
  dashboard: <MdDashboard />,
  cart: <MdShoppingCart />,
  cart2: <FaCartPlus />,
  cart3: <BsCart />,
  account: <FaUser />,
  search: <MdSearch />,
  list: <MdList />,
  wish: <MdFavorite />,
  menu: <MdMenu />,
  expend: <MdExpandMore />,
  cross: <MdClose />,
  checkout: <MdShoppingCartCheckout />,
  login: <FaRightToBracket />,
  lock: <FaLock />,
  google: <FcGoogle />,
  phone: <IoPhonePortraitOutline />,
};
