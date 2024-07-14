import {
  Close,
  Dashboard,
  ExpandMore,
  Favorite,
  Home,
  List,
  Menu,
  Person,
  Search,
  ShoppingCart,
  ShoppingCartCheckout,
} from "@mui/icons-material";

export const allIcons = {
  home: <Home />,
  dashboard: <Dashboard />,
  cart: (size = "default") => <ShoppingCart fontSize={size} />,
  account: <Person fontSize="small" />,
  search: <Search />,
  list: (size = 'default') => <List fontSize={size} />,
  wish: <Favorite />,
  menu: <Menu />,
  expend: <ExpandMore fontSize="small" />,
  cross: (size = "default") => <Close fontSize={size} />,
  checkout: (size = "default") => <ShoppingCartCheckout fontSize={size} />,
};
