const studentService = require("../services/student.service");

const createStudent = async (req, res) => {
  try {
    const result = await studentService.createStudent(req.body);
    if (!result) {
      return res
        .status(409)
        .json({ error: "Email hoặc student ID đã tồn tại" });
    }
    res
      .status(201)
      .json({ message: "Tạo sinh viên thành công", student: result.student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const result = await studentService.getAllStudents();
    if (result.length === 0) {
      res.status(404).json({ error: "Chưa có sinh viên nào" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student)
      return res.status(404).json({ error: "Sinh viên không tồn tại" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    if (!student)
      return res.status(404).json({ error: "Sinh viên không tồn tại" });
    res.status(200).json({ message: "Cập nhật thành công", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await studentService.deleteStudent(req.params.id);
    if (!student)
      return res.status(404).json({ error: "Sinh viên không tồn tại" });
    res.status(200).json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const student = await studentService.getProfileByEmail(req.user.email);
    if (!student)
      return res.status(404).json({ error: "Không tìm thấy profile" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getProfile,
};
