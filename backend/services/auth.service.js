const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/user.schema");
const Student = require("../models/student.schema");
const Token = require("../models/token.schema");

const base64urlEncode = (str) => {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const base64urlDecode = (str) => {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(str, "base64").toString();
};

const signToken = (payload, secret, expiresInSec = 60) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const exp = Math.floor(Date.now() / 1000) + expiresInSec;
  const data = { ...payload, exp };

  const headerEncoded = base64urlEncode(JSON.stringify(header));
  const payloadEncoded = base64urlEncode(JSON.stringify(data));
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const token = `${headerEncoded}.${payloadEncoded}.${signature}`;
  return token;
};

const verifyToken = (token, secret) => {
  const [headerEncoded, payloadEncoded, signature] = token.split(".");
  const checkSignature = crypto
    .createHmac("sha256", secret)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  if (signature !== checkSignature) {
    return null;
  }
  const payload = JSON.parse(base64urlDecode(payloadEncoded));
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  return payload;
};

// ✅ SỬA 1: Tăng thời gian hết hạn accessToken
const login = async (email, password, secret) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isMatch = await comparePassword(password, user.hashedPassword);
  if (!isMatch) return null;

  const accessToken = signToken(
    { id: user._id, role: user.role, email: user.email },
    secret,
    60
  );

  const refreshToken = signToken({ id: user._id }, secret, 7 * 24 * 60 * 60);

  await Token.create({
    userId: user._id,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return { user, accessToken, refreshToken };
};

const registerStudent = async (data) => {
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

  const safeUser = {
    _id: user._id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  return { user: safeUser, student };
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// ✅ SỬA 2: Sửa lỗi mất 'role' khi refresh
const refreshAccessToken = async (refreshToken, secret) => {
  const stored = await Token.findOne({ refreshToken });
  if (!stored) return null;

  const payload = verifyToken(refreshToken, secret);

  if (!payload) {
    await Token.deleteOne({ refreshToken });
    return null;
  }

  // Phải truy vấn lại CSDL để lấy thông tin 'role' mới nhất
  const user = await User.findById(payload.id);
  if (!user) {
    await Token.deleteOne({ refreshToken });
    return null;
  }

  // Tạo token mới với đầy đủ 'id' và 'role'
  const newAccessToken = signToken(
    { id: user._id, role: user.role },
    secret,
    60
  );
  return { accessToken: newAccessToken };
};

const logout = async (refreshToken) => {
  await Token.deleteOne({ refreshToken });
};

const isTokenRevoked = async (token) => {
  const exists = await Token.findOne({ refreshToken: token });
  return !exists;
};

module.exports = {
  login,
  logout,
  registerStudent,
  verifyToken,
  signToken,
  isTokenRevoked,
  comparePassword,
  refreshAccessToken,
};
