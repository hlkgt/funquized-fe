import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios";

const AuthRouters = () => {
  const isLogin = window.localStorage.getItem("isLogin");

  const getUser = async () => {
    const { data } = await axiosInstance.get("/users");
    return data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }

  if (!isLoading && data) {
    return data ? <Outlet context={data} /> : <Navigate to={"/login"} />;
  }
};

export default AuthRouters;
