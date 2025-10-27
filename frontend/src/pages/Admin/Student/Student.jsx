import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { getAllStudent, deleteStudent } from "../../../apis/studentAPI";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOnDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
      try {
        await deleteStudent(id);
        setStudents((prev) => prev.filter((s) => s._id !== id));
      } catch (err) {
        console.error("Lỗi xóa sinh viên:", err);
        alert("Không thể xóa sinh viên");
      }
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudent();
        setStudents(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh sách sinh viên:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);
  if (loading) return <p>Đang tải dữ liệu...</p>;
  return (
    <div className={styles.data_table}>
      <div className={styles.table_header}>
        <h3 className={styles.table_title}>Danh sách sinh viên</h3>
        <button className={styles.export_btn}>
          <FaPlus />
          <span>Thêm sinh viên</span>
        </button>
      </div>
      <div className={styles.table_responsive}>
        <table className={`table table-hover mb-0 ${styles.table}`}>
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Ngành</th>
              <th>Năm nhập học</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>
                  <strong>{s.fullName}</strong>
                </td>
                <td>{s.email}</td>
                <td>{s.major}</td>
                <td>
                  <span>Năm {s.year}</span>
                </td>
                <td className={styles.box_options}>
                  <button className={styles.option_edit}>
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => handleOnDelete(s._id)}
                    className={styles.option_trash}
                  >
                    <CiTrash />
                  </button>
                  <button className={styles.option_lock}>
                    <CiLock />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
