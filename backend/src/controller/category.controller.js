import Category from "../models/category.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file && req.file.path;

    if (!name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori harus diisi",
      });
    }

    const nameLower = name.toLowerCase();
    const existingCategory = await Category.findOne({ name: nameLower });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Kategori sudah ada",
      });
    }

    const category = await Category.create({
      name: nameLower,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Kategori berhasil dibuat",
      data: category,
    });
  } catch (error) {
    console.log("Error in creating category", error);
    res.status(500).json({
      success: false,
      message: "Error in creating category",
      error: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Kategori berhasil diambil",
      data: categories,
    });
  } catch (error) {
    console.log("Error in getting all categories", error);
    res.status(500).json({
      success: false,
      message: "Error in getting all categories",
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Kategori berhasil diambil",
        data: category,
      });
    }
  } catch (error) {
    console.log("Error in getting category by id", error);
    res.status(500).json({
      success: false,
      message: "Error in getting category by id",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);
    console.log("category", category);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    category.name = name || category.name;
    category.description = description || category.description;

    if (req.file) {
      if (category.image) {
        const publicId = category.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`zahra-cakencookies/${publicId}`);
      }
      category.image = req.file.path;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Kategori berhasil diupdate",
      data: category,
    });
  } catch (error) {
    console.log("Error in updating category", error);
    res.status(500).json({
      success: false,
      message: "Error in updating category",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    if (category.image) {
      const publicId = category.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`zahra-cakencookies/${publicId}`);
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
    });
  } catch (error) {
    console.log("Error in deleting category", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting category",
      error: error.message,
    });
  }
};
