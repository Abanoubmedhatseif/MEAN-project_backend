const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "asbfdngdfedcfsa");
    req.body._id = decoded._id;
    next();
  } catch (error) {
    // next(error);
    res.status(401).json({ error: "Invalid token" });
  }

}

module.exports = verifyToken