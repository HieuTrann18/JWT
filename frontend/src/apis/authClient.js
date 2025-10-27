import axiosClient from "./axiosClient";

const signIn = async (data) => {
      return await axiosClient.post("/login", data)
}

export {signIn}