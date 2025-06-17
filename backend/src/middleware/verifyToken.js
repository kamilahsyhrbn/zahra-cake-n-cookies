import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Akses ditolak, silakan login terlebih dahulu",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Token tidak valid" });
    }

    if (decoded.exp < Date.now() / 1000) {
      return res
        .status(401)
        .json({ success: false, message: "Token telah kadaluarsa" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token tidak valid",
      error: error.message,
    });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user && user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Akses ditolak, Anda bukan admin",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
};
