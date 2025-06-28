import Transaction from "../models/transaction.model.js";

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Transaction berhasil diambil",
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
        message: "Transaction tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction berhasil diambil",
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

export const handleMidtransNotification = async (req, res) => {};
