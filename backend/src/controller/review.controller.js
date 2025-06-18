import Review from "../models/review.model.js";
import Order from "../models/order.model.js";

// POST /api/reviews
export const createReview = async (req, res) => {
  const { orderId, menuId, rating, comment } = req.body;

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order tidak ditemukan" });

  const item = order.items.find((i) => i.menu.toString() === menuId.toString());

  if (!item)
    return res.status(400).json({ message: "Menu tidak ada dalam order" });

  const existing = await Review.findOne({
    user: req.user.id,
    menu: menuId,
    order: orderId,
  });

  if (existing)
    return res
      .status(400)
      .json({ message: "Kamu sudah memberikan review untuk menu ini" });

  const review = await Review.create({
    user: req.user.id,
    menu: menuId,
    order: orderId,
    rating,
    comment,
  });

  item.isReviewed = true;
  await order.save();

  res.status(201).json(review);
};

export const getAllReviews = async (req, res) => {
  const { id } = req.params;

  const reviews = await Review.find({ menu: id })
    .populate("user", "name image")
    .select("-order")
    .select("-menu");

  res.status(200).json({
    success: true,
    message: "Berhasil mendapatkan review",
    data: reviews,
  });
};

export const updateReview = async (req, res) => {
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
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review tidak ditemukan",
    });
  }

  const order = await Order.findById(review.order);
  order.items.forEach((item) => {
    if (item.menu.toString() === review.menu.toString()) {
      item.isReviewed = false;
    }
  });
  await order.save();

  res.status(200).json({
    success: true,
    message: "Review berhasil dihapus",
  });
};
