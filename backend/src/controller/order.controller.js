import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Menu from "../models/menu.model.js";
import snap from "../utils/midtrans.js";
import Transaction from "../models/transaction.model.js";

export const createOrder = async (req, res) => {
  try {
    const {
      items,
      name,
      phone,
      address,
      province,
      city,
      courier,
      cost,
      service,
      estimation,
      notes,
    } = req.body;

    if (
      !items ||
      !name ||
      !phone ||
      !address ||
      !province ||
      !city ||
      !courier ||
      !cost ||
      !service
    ) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    const menuIds = items.map((item) => item.menu);
    const menus = await Menu.find({ _id: { $in: menuIds } });

    let totalWeight = 0;
    let totalPrice = 0;

    for (let item of items) {
      const menu = menus.find(
        (p) => p._id.toString() === item.menu._id.toString()
      );

      if (!menu)
        return res.status(404).json({ message: "Menu tidak ditemukan" });

      if (menu.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Stok ${menu.name} tidak cukup` });
      }
      totalWeight += menu.weight * item.quantity;
      totalPrice += menu.price * item.quantity;
    }

    const grandTotal = totalPrice + cost;
    const orderId = `ZCNC-${new Date().getTime().toString()}`;

    const midtransResponse = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: grandTotal,
      },
      customer_details: {
        first_name: name,
        phone,
      },
    });

    const order = new Order({
      user: req.user.id,
      items: items.map((item) => ({
        menu: item.menu._id,
        price: item.menu.price,
        quantity: item.quantity,
      })),
      shipping: {
        name,
        phone,
        address,
        province,
        city,
        courier,
        service,
        cost,
        estimation,
        notes,
      },
      totalWeight,
      totalPrice: grandTotal,
    });

    const transaction = await Transaction.create({
      user: req.user.id,
      order: order._id,
      orderId,
      amount: grandTotal,
      paymentUrl: midtransResponse.redirect_url,
    });

    order.transaction = transaction._id;
    await order.save();

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan",
      });
    } else {
      await Cart.findOneAndDelete({ user: req.user.id });
    }

    res.status(201).json({
      success: true,
      message: "Order berhasil dibuat",
      data: order,
    });
  } catch (error) {
    console.log("Error in creating order", error);
    res.status(500).json({
      success: false,
      message: "Error in creating order",
      error: error.message,
    });
  }
};

export const getOrderByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.menu")
      .populate("transaction");

    res.status(200).json({
      success: true,
      message: "Order berhasil diambil",
      data: orders,
    });
  } catch (error) {
    console.log("Error in getting order by user id", error);
    res.status(500).json({
      success: false,
      message: "Error in getting order by user id",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("user")
      .populate("items.menu")
      .populate("transaction");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order berhasil diambil",
      data: order,
    });
  } catch (error) {
    console.log("Error in getting order by id", error);
    res.status(500).json({
      success: false,
      message: "Error in getting order by id",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $nin: ["unpaid", "cancelled"] },
    })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("items.menu")
      .populate("transaction");

    res.status(200).json({
      success: true,
      message: "Order berhasil diambil",
      data: orders,
    });
  } catch (error) {
    console.log("Error in getting all orders", error);
    res.status(500).json({
      success: false,
      message: "Error in getting all orders",
      error: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    if (status === "cancelled") {
      const transaction = await Transaction.findByIdAndDelete(
        order.transaction
      );
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaksi tidak ditemukan",
        });
      }
    }

    order.status = status || order.status;
    order.shipping.trackingNumber =
      trackingNumber || order.shipping.trackingNumber;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order berhasil diperbarui",
      data: order,
    });
  } catch (error) {
    console.log("Error in updating order", error);
    res.status(500).json({
      success: false,
      message: "Error in updating order",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order tidak ditemukan",
      });
    }

    const transaction = await Transaction.findByIdAndDelete(order.transaction);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order dan transaksi berhasil dihapus",
    });
  } catch (error) {
    console.log("Error in deleting order", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting order",
      error: error.message,
    });
  }
};

export const report = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    const filter = {
      createdAt: { $gte: start, $lt: end },
    };

    if (status && status !== "all") {
      filter.status = status;
    }

    const report = await Order.find(filter)
      .populate("user")
      .populate("items.menu")
      .populate("transaction");

    res.status(200).json({
      success: true,
      message: "Laporan berhasil diambil",
      data: report,
    });
  } catch (error) {
    console.log("Error in getting report", error);
    res.status(500).json({
      success: false,
      message: "Error in getting report",
      error: error.message,
    });
  }
};
