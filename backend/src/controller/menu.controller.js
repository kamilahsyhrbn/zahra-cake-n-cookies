import User from "../models/user.model.js";
import Menu from "../models/menu.model.js";
import cloudinary from "../lib/cloudinary.js";
import tf from "@tensorflow/tfjs";

export const createMenu = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      weight,
      description,
      isPreOrder,
      preOrderEst,
      stock,
    } = req.body;

    if (isPreOrder && !preOrderEst) {
      return res.status(400).json({
        success: false,
        message: "Estimasi waktu pre-order harus diisi",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada file gambar yang diunggah",
      });
    }

    const images = req.files.map((file) => file.path);

    const menu = await Menu.create({
      name,
      category,
      price,
      weight,
      description,
      isPreOrder,
      preOrderEst,
      stock,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Berhasil menambahkan menu",
      data: menu,
    });
  } catch (error) {
    console.log("Error in creating Menu", error);
    res.status(500).json({
      success: false,
      message: "Error in creating Menu",
      error: error.message,
    });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const { category, sort } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    let sortOptions = {};
    if (sort === "price-asc") {
      sortOptions.price = -1;
    } else if (sort === "price-desc") {
      sortOptions.price = 1;
    } else if (sort === "newest") {
      sortOptions.createdAt = -1;
    } else if (sort === "oldest") {
      sortOptions.createdAt = 1;
    } else if (sort === "top-menus") {
      sortOptions.totalSold = -1;
    }

    const menus = await Menu.find(filter)
      .sort(sortOptions)
      .populate("category");

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan semua data menu",
      data: menus,
    });
  } catch (error) {
    console.log("Error in getting all Menus", error);
    res.status(500).json({
      success: false,
      message: "Error in getting all Menus",
      error: error.message,
    });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id).populate("category");

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data menu",
      data: menu,
    });
  } catch (error) {
    console.log("Error in getting Menu", error);
    res.status(500).json({
      success: false,
      message: "Error in getting Menu",
      error: error.message,
    });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      price,
      weight,
      description,
      isPreOrder,
      preOrderEst,
      stock,
    } = req.body;

    const deletedImages = req.body.deletedImages
      ? [].concat(req.body.deletedImages)
      : [];

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    // hapus foto dari cloudinary
    if (deletedImages.length > 0) {
      for (const imageUrl of deletedImages) {
        const imageId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`zahra-cakencookies/${imageId}`);
      }

      // hapus foto dari array
      menu.images = menu.images.filter(
        (image) => !deletedImages.includes(image)
      );
    }

    // memasukkan foto baru
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      menu.images = [...menu.images, ...newImages];
    }

    menu.name = name || menu.name;
    menu.price = price || menu.price;
    menu.category = category || menu.category;
    menu.description = description || menu.description;
    menu.stock = stock || menu.stock;
    menu.isPreOrder = isPreOrder || menu.isPreOrder;
    menu.preOrderEst = preOrderEst || menu.preOrderEst;
    menu.weight = weight || menu.weight;

    const updatedMenu = await menu.save();

    res.status(200).json({
      success: true,
      message: "Berhasil memperbarui data menu",
      data: updatedMenu,
    });
  } catch (error) {
    console.log("Error in updating Menu", error);
    res.status(500).json({
      success: false,
      message: "Error in updating Menu",
      error: error.message,
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }
    // hapus foto dari cloudinary
    for (const imageUrl of menu.images) {
      const imageId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`zahra-cakencookies/${imageId}`);
    }

    await Menu.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus data menu",
    });
  } catch (error) {
    console.log("Error in deleting Menu", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting Menu",
      error: error.message,
    });
  }
};

export const searchMenu = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query tidak boleh kosong",
      });
    }

    const menus = await Menu.find({
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data menu",
      data: menus,
    });
  } catch (error) {
    console.log("Error in searching Menu", error);
    res.status(500).json({
      success: false,
      message: "Error in searching Menu",
      error: error.message,
    });
  }
};

export const likeUnlikeMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    const userLikedMenu = menu.likes.includes(userId);

    if (userLikedMenu) {
      menu.likes = menu.likes.filter(
        (likeUserId) => likeUserId.toString() !== userId.toString()
      );
      user.likedMenus = user.likedMenus.filter(
        (likedMenuId) => likedMenuId.toString() !== id.toString()
      );

      await menu.save();
      await user.save();
      res.status(200).json({
        success: true,
        message: "Batal menyukai menu",
        data: {
          likes: menu.likes,
          likedMenus: user.likedMenus,
        },
      });
    } else {
      menu.likes.push(userId);
      user.likedMenus.push(id);

      await menu.save();
      await user.save();
      res.status(200).json({
        success: true,
        message: "Berhasil menyukai menu",
        data: {
          likes: menu.likes,
          likedMenus: user.likedMenus,
        },
      });
    }
  } catch (error) {
    console.log("Error in like unlike Menu", error);
    res.status(500).json({
      success: false,
      message: "Error in like unlike Menu",
      error: error.message,
    });
  }
};

export const getBestSellingMenu = async (req, res) => {
  try {
    const menus = await Menu.find();

    if (menus.length === 0) {
      res.status(200).json({
        success: true,
        message: "Tidak ada data menu",
        data: [],
      });
      return;
    }

    const salesData = menus.map((menu) => menu.totalSold);

    const salesTensor = tf.tensor(salesData);

    const sortedIndices = tf
      .topk(salesTensor, menus.length)
      .indices.arraySync();

    const BestSellingMenu = sortedIndices.map((index) => {
      return {
        ...menus[index]._doc,
      };
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data menu terlaris",
      data: BestSellingMenu,
    });
  } catch (error) {
    console.log("Error in getting best selling menu", error);
    res.status(500).json({
      success: false,
      message: "Error in getting best selling menu",
      error: error.message,
    });
  }
};

export const getRecommendationMenus = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    const menus = await Menu.find({
      _id: { $ne: id },
      stock: { $gte: 1 },
    }).limit(4);

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan rekomendasi menu",
      data: menus,
    });
  } catch (error) {
    console.log("Error in getting recommendation menus", error);
    res.status(500).json({
      success: false,
      message: "Error in getting recommendation menus",
      error: error.message,
    });
  }
};
