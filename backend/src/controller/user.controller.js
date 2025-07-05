import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Pengguna berhasil diambil",
      data: users,
    });
  } catch (error) {
    console.log("Error in getting all users", error);
    res.status(500).json({
      success: false,
      message: "Error in getting all users",
      error: error.message,
    });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Admin berhasil diambil",
      data: admins,
    });
  } catch (error) {
    console.log("Error in getting all admins", error);
    res.status(500).json({
      success: false,
      message: "Error in getting all users",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Pengguna berhasil diambil",
        data: user,
      });
    }
  } catch (error) {
    console.log("Error in getting user", error);
    res.status(500).json({
      success: false,
      message: "Error in getting user",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, image } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    if (image === "") {
      if (user.image) {
        const publicId = user.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`zahra-cakencookies/${publicId}`);
      }
      user.image = "";
    } else if (req.file) {
      if (user.image) {
        const publicId = user.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`zahra-cakencookies/${publicId}`);
      }

      user.image = req.file.path;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Berhasil memperbarui pengguna",
      data: user,
    });
  } catch (error) {
    console.log("Error in updating user", error);
    res.status(500).json({
      success: false,
      message: "Error in updating user",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    if (user.image) {
      const publicId = user.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`zahra-cakencookies/${publicId}`);
    }

    const reviews = await Review.find({ user: id });

    for (const review of reviews) {
      await Review.findByIdAndDelete(review._id);
    }

    res.status(200).json({
      success: true,
      message: "Pengguna berhasil dihapus",
    });
  } catch (error) {
    console.log("Error in deleting user", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting user",
      error: error.message,
    });
  }
};

export const getLikedMenu = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).populate("likedMenus");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data menu yang disukai",
      data: user.likedMenus,
    });
  } catch (error) {
    console.log("Error in getting liked menu", error);
    res.status(500).json({
      success: false,
      message: "Error in getting liked menu",
      error: error.message,
    });
  }
};
