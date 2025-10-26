const Student = require("../models/student.schema");
const User = require("../models/user.schema");
const Token = require("../models/token.schema");
const bcrypt = require("bcrypt");

const createStudent = async (data) => {
  const { email, password, fullName, studentId, major, year } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) return null;
  const existingStudent = await Student.findOne({ studentId });
  if (existingStudent) return null;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    hashedPassword,
    role: "student",
  });
  const student = await Student.create({
    fullName,
    email,
    studentId,
    major,
    year,
  });

  return { user, student };
};

const getAllStudents = async () => {
  return await Student.find().sort({ createdAt: -1 });
};

const getStudentById = async (id) => {
  const student = await Student.findById(id);
  if (!student) return null;
  return student;
};

const updateStudent = async (id, data) => {
  const student = await Student.findByIdAndUpdate(id, data, { new: true });
  return student;
};

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id);
  if (!student) return null;
  await User.findOneAndDelete({ email: student.email });
  await Token.deleteMany({ userId: student._id });
  return student;
};

const getProfileByEmail = async (email) => {
  const student = await Student.findOne({ email });
  if (!student) return null;
  return student;
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  getProfileByEmail,
};
