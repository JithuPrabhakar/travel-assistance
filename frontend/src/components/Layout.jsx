import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useSelector } from "react-redux";

export const Layout = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <div className="p-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};
