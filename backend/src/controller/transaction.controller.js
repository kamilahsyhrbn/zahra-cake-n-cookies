import Transaction from "../models/transaction.model.js";
import Menu from "../models/menu.model.js";
import axios from "axios";

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Transasksi berhasil diambil",
      data: transactions,
    });
  } catch (error) {
    console.log("Error in getting transaction", error);
    res.status(500).json({
      success: false,
      message: "Error in getting transaction",
      error: error.message,
    });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaksi tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaksi berhasil diambil",
      data: transaction,
    });
  } catch (error) {
    console.log("Error in getting transaction by id", error);
    res.status(500).json({
      success: false,
      message: "Error in getting transaction by id",
      error: error.message,
    });
  }
};

export const updateTransactionStatus = async (req, res) => {
  const { orderId } = req.params;

  const transaction = await Transaction.findOne({ orderId });
  if (!transaction) {
    return res
      .status(404)
      .json({ success: false, message: "Transaksi tidak ditemukan" });
  }

  const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
  const auth = Buffer.from(midtransServerKey).toString("base64");

  try {
    // Fetch status dari Midtrans
    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          Authorization: `Basic : ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    const transactionStatus = response.data.transaction_status;

    if (transactionStatus === transaction?.transactionStatus) {
      return res
        .status(200)
        .json({ success: false, message: "Status transaksi sama" });
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      { orderId },
      { transactionStatus },
      { new: true }
    );

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    if (transactionStatus === "settlement") {
      const order = await Transaction.findOne({ orderId }).populate("order");
      order.order.status = "processing";
      await order.order.save();
      const { items } = order.order;
      for (let item of items) {
        const menu = await Menu.findById(item.menu);
        menu.stock -= item.quantity;
        menu.totalSold += 1;
        await menu.save();
      }
    }

    res.status(200).json({
      message: "Status transaksi berhasil diperbarui",
      data: updatedTransaction,
    });
  } catch (error) {
    console.log("Midtrans status update error:", error.response?.data || error);
    res.status(500).json({
      success: false,
      message: "Gagal memperbarui status transaksi",
      error: error.message,
    });
  }
};

export const handleMidtransNotification = async (req, res) => {
  const notification = req.body;

  const orderId = notification.order_id;
  const transactionStatus = notification.transaction_status;

  const transaction = await Transaction.findOne({ orderId: orderId });
  if (!transaction) {
    return res
      .status(404)
      .json({ success: false, message: "Transaksi tidak ditemukan" });
  }

  if (transactionStatus === transaction?.transactionStatus) {
    return res
      .status(200)
      .json({ success: false, message: "Status transaksi sama" });
  }

  try {
    const updated = await Transaction.findOneAndUpdate(
      { orderId },
      { transactionStatus },
      { new: true }
    );

    {
      if (notification.transaction_status === "settlement") {
        const order = await Transaction.findOne({ orderId }).populate("order");
        order.order.status = "processing";
        await order.order.save();

        const { items } = order.order;
        for (let item of items) {
          const menu = await Menu.findById(item.menu);
          menu.stock -= item.quantity;
          menu.totalSold += 1;
          await menu.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Status transaksi berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.log("Midtrans status update error", error);
    res.status(500).send("Webhook update failed");
  }
};
