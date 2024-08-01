import { FaUser } from "react-icons/fa";
import { FaCartPlus, FaRightToBracket } from "react-icons/fa6";
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
  account: <FaUser />,
  search: <MdSearch />,
  list: <MdList />,
  wish: <MdFavorite />,
  menu: <MdMenu />,
  expend: <MdExpandMore />,
  cross: <MdClose />,
  checkout: <MdShoppingCartCheckout />,
  login: <FaRightToBracket />,
};
