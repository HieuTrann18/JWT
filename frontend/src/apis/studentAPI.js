import axiosClient from "./axiosClient";

const getAllStudent = async () => {
  const res = await axiosClient.get("/students");
  return res;
};

const deleteStudent = async (id) => {
  return await axiosClient.delete(`/students/${id}`);
};

export { getAllStudent, deleteStudent };
