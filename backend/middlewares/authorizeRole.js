const authorizeRole = (role = []) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ error: "User not authenticated" });
    if (!role.includes(req.user.role))
      return res
        .status(403)
        .json({ error: "Access denied: insufficient role" });
    next();
  };
};

module.exports = { authorizeRole };
