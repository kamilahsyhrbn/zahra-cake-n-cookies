import Review from "../models/review.model.js";
import Order from "../models/order.model.js";
import Menu from "../models/menu.model.js";

export const createReview = async (req, res) => {
  try {
    const { orderId, menuId, rating, comment } = req.body;

    // Cek order
    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ message: "Order tidak ditemukan" });

    // Pastikan menu ada dalam order
    const item = order.items.find(
      (i) => i.menu.toString() === menuId.toString()
    );
    if (!item)
      return res.status(400).json({ message: "Menu tidak ada dalam order" });

    // Cek existing review
    const existing = await Review.findOne({
      user: req.user.id,
      menu: menuId,
      order: orderId,
    });
    if (existing)
      return res
        .status(400)
        .json({ message: "Kamu sudah memberikan review untuk menu ini" });

    // Buat review baru
    const review = await Review.create({
      user: req.user.id,
      menu: menuId,
      order: orderId,
      rating,
      comment,
    });

    // Tandai item sudah direview
    item.isReviewed = true;
    await order.save();

    // Update totalReview, totalRating, averageRating di Menu
    const menu = await Menu.findById(menuId);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });

    menu.totalReview += 1;
    menu.totalRating += rating;
    menu.averageRating = menu.totalRating / menu.totalReview;

    await menu.save();

    res.status(201).json({
      success: true,
      message: "Ulasan berhasil dibuat dan averageRating terupdate",
      data: review,
    });
  } catch (error) {
    console.log("Error in createReview", error);
    res.status(500).json({
      success: false,
      message: "Error in creating review",
      error: error.message,
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { id, sort, rating } = req.query;
    let filter = { menu: id };
    let sortOptions = {};

    if (sort === "newest") {
      sortOptions.createdAt = -1;
    } else if (sort === "oldest") {
      sortOptions.createdAt = 1;
    }

    if (rating) {
      filter.rating = +rating;
    }

    const reviews = await Review.find(filter)
      .populate("user", "name image")
      .sort(sortOptions);

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan review",
      data: reviews,
    });
  } catch (error) {
    console.log("Error in getAllReviews", error);
    res.status(500).json({
      success: false,
      message: "Error in getting all reviews",
      error: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review tidak ditemukan",
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review berhasil diperbarui",
      data: review,
    });
  } catch (error) {
    console.log("Error in updating review", error);
    res.status(500).json({
      success: false,
      message: "Error in updating review",
      error: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { menuId, reviewId, orderId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review tidak ditemukan",
      });
    }

    const ratingToRemove = review.rating;

    await Review.findByIdAndDelete(reviewId);

    const menu = await Menu.findById(menuId);

    if (menu.totalReview > 1) {
      menu.totalReview -= 1;
      menu.totalRating -= ratingToRemove;
      menu.averageRating = menu.totalRating / menu.totalReview;
    } else {
      menu.totalReview = 0;
      menu.totalRating = 0;
      menu.averageRating = 0;
    }

    await menu.save();

    // 4. Update order terkait
    const order = await Order.findById(orderId);

    if (order) {
      order.items.forEach((item) => {
        if (item.menu.toString() === menuId) {
          item.isReviewed = false;
        }
      });

      await order.save();
    }

    res.status(200).json({
      success: true,
      message: "Review berhasil dihapus dan averageRating terupdate",
      data: menu,
    });
  } catch (error) {
    console.log("Error deleting review", error);
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};
