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
} from "@mui/icons-material";

export const allIcons = {
  home: <Home />,
  dashboard: <Dashboard />,
  cart: <ShoppingCart fontSize="medium"/>,
  account: <Person fontSize="small" />,
  search: <Search />,
  list: <List fontSize="medium" />,
  wish: <Favorite />,
  menu: <Menu />,
  expend: <ExpandMore fontSize="small"/>,
  cross: <Close fontSize="large"/>,
};
