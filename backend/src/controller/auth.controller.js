import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import { generateToken, sendEmail } from "../lib/utils.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    if (
      (role === "user" && !phone) ||
      (role === "user" && phone.trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "Nomor telepon harus diisi",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    const existingPhone = await User.findOne({ phone });
    if (role === "user" && existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Nomor telepon sudah terdaftar",
      });
    }

    const user = await User.create({
      name,
      email,
      phone: role === "admin" ? null : phone,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Pendaftaran berhasil",
      data: user,
    });
  } catch (error) {
    console.log("Error in register: ", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Kredensial tidak valid",
      });
    }

    if (user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `Tidak dapat login, Anda bukan ${role}`,
      });
    }

    const token = generateToken(user._id, "1d");

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log("Error in login: ", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || email.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Email harus diisi",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    const token = generateToken(user._id, "15m");

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const templatePath = "src/lib/email/forgot-password.html";

    let emailTemplate = fs.readFileSync(templatePath, "utf-8");

    emailTemplate = emailTemplate
      .replace("{{resetLink}}", resetLink)
      .replace("{{name}}", user.name);

    sendEmail(user.email, "Atur Ulang Kata Sandi", emailTemplate);

    return res.status(200).json({
      success: true,
      message: "Email reset kata sandi berhasil dikirim",
    });
  } catch (error) {
    console.log("Error in forgotPassword: ", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Token tidak valid",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Kata sandi berhasil diatur ulang",
    });
  } catch (error) {
    console.log("Error in resetPassword: ", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (
      !currentPassword ||
      !newPassword ||
      currentPassword === "" ||
      newPassword === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    const isPasswordMatch = await user.comparePassword(currentPassword);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Kata sandi saat ini salah",
      });
    }

    user.password = newPassword;
    await user.save();

    if (user.role !== "admin") {
      const token = generateToken(user._id, "15m");

      const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

      const templatePath = "src/lib/email/change-password.html";

      let emailTemplate = fs.readFileSync(templatePath, "utf-8");

      emailTemplate = emailTemplate
        .replace("{{resetLink}}", resetLink)
        .replace("{{name}}", user.name);

      sendEmail(user.email, "Kata Sandi Diubah", emailTemplate);
    }

    return res.status(200).json({
      success: true,
      message: "Kata sandi berhasil diubah",
    });
  } catch (error) {
    console.log("Error in resetPassword: ", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
      error: error.message,
    });
  }
};
