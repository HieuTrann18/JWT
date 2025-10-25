const authService = require("../services/auth.service");
const SECRET = process.env.SECRETKEY;

const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header hoặc cookie
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    if (!token) return res.status(401).json({ error: "No token provided" });

    const payload = authService.verifyToken(token, SECRET);
    if (!payload) return res.status(401).json({ error: "Invalid token" });

    const revoked = await authService.isTokenRevoked(token);
    if (revoked) return res.status(401).json({ error: "Token revoked" });

    req.user = payload;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { authenticate };
