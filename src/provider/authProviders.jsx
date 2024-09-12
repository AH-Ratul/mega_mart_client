import { useDispatch, useSelector } from "react-redux";
import { useGetMeQuery } from "../redux/api/users_api";
import Modal from "../components/Shared/Modal/Modal";
import Loader from "../components/Shared/Loader/Loader";
import { setUser } from "../redux/slices/authSlice";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { data: userData, isLoading } = useGetMeQuery();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData) {
      const user = userData.data;
      dispatch(setUser(user));
    }
  }, [userData, dispatch]);

  if (isLoading || loading) {
    return <Modal modal={<Loader color="white" size="70px" />} />;
  }

  return <>{children}</>;
};

export default AuthProvider;
