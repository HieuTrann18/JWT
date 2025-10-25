const authService = require("../services/auth.service");
const Token = require("../models/token.schema");
const SECRET = process.env.SECRETKEY;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password, SECRET);
    if (!result) {
      return res.status(401).json({ error: "Email hoặc mật khẩu không đúng" });
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

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Chưa có token" });
    }

    const token = authHeader.split(" ")[1];
    await authService.logout(token);
    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Đăng xuất thất bại" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ error: "Không có refresh token" });

    const newAccessToken = await authService.refreshAccessToken(
      refreshToken,
      SECRET
    );

    if (!newAccessToken)
      return res.status(401).json({ error: "Refresh token không hợp lệ" });

    return res.status(200).json({ newAccessToken });
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
};
