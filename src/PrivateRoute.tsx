import { Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks";

export const PrivateRoute = ({ children }: any) => {
  const user = useAppSelector((state) => state.user);
  if (user.accessToken) {
    return children;
  }
  return <Navigate to="/signin" />;
};
