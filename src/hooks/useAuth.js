import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
   const storedUser = JSON.parse(localStorage.getItem('user'));

   if(storedUser) {
    dispatch(login(storedUser))
   }
  }, [dispatch]);

  return {user}

};

export default useAuth;
