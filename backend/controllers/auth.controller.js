const authService = require("../services/auth.service");
const SECRET = process.env.SECRETKEY;

const register = async (req, res) => {
  try {
    const result = await authService.registerStudent(req.body);
    if (!result) {
      return res.status(409).json({
        error: "Email đã được đăng ký",
      });
    }
    return res.status(201).json({
      message: "Đăng ký sinh viên thành công",
      user: result.user,
      student: result.student,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Đăng ký thất bại" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password, SECRET);

    if (!result) {
      return res
        .status(401)
        .json({ error: "Email hoặc mật khẩu không chính xác" });
    }

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Đăng nhập thất bại" });
  }
};

// ✅ SỬA: Hàm logout phải nhận refreshToken từ body
const logout = async (req, res) => {
  try {
    // Lấy refreshToken từ body thay vì header
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ error: "Chưa cung cấp refresh token" });
    }

    await authService.logout(refreshToken);
    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Đăng xuất thất bại" });
  }
};

// ✅ SỬA: Sửa cách trả về JSON
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ error: "Không có refresh token" });

    // Hàm service trả về một object, ví dụ: { accessToken: "..." }
    const result = await authService.refreshAccessToken(refreshToken, SECRET);

    if (!result)
      return res.status(401).json({ error: "Refresh token không hợp lệ" });

    // Trả về thẳng object đó
    return res.status(200).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Không thể làm mới token" });
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
  register,
};
