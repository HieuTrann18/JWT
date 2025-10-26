const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getProfile,
} = require("../controllers/student.controller");
const { authenticate } = require("../middlewares/authenticate");
const { authorizeRole } = require("../middlewares/authorizeRole");

// ===ADMIN CRUD=== //
router.post("/", authenticate, authorizeRole(["admin"]), createStudent);
router.get("/", authenticate, authorizeRole(["admin"]), getAllStudents);
router.get("/:id", authenticate, authorizeRole(["admin"]), getStudentById);
router.put("/:id", authenticate, authorizeRole(["admin"]), updateStudent);
router.delete("/:id", authenticate, authorizeRole(["admin"]), deleteStudent);

// ===STUDENT PROFILE=== //
router.get(
  "/profile/me",
  authenticate,
  authorizeRole(["student", "admin"]),
  getProfile
);

module.exports = router;
