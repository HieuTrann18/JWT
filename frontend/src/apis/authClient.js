import axiosClient from "./axiosClient";

const signIn = async (body) => {
  return await axiosClient.post("/login", body);
};

const refreshToken = async (refreshToken) => {
  const res = await axiosClient.post("/refresh-token", { refreshToken });
  return res.data;
};

export { signIn, refreshToken };
