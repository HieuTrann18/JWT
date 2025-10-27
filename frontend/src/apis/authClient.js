import axiosClient from "./axiosClient";

const signIn = async (data) => {
  return await axiosClient.post("/auth/login", data);
};

const refreshAccessToken = async (refreshToken) => {
  return await axiosClient.post("/auth/refresh-token", { refreshToken });
};

export { signIn, refreshAccessToken };
