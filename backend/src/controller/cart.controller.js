import Cart from "../models/cart.model.js";
import Menu from "../models/menu.model.js";

export const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const qty = quantity || 1;

    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    let existingQuantity = 0;

    if (cart) {
      const existingItem = cart.menus.find(
        (item) => item.menu.toString() === menuId
      );
      if (existingItem) {
        existingQuantity = existingItem.quantity;
      }
    }

    const totalRequested = existingQuantity + qty;

    if (totalRequested > menu.stock) {
      return res.status(400).json({
        success: false,
        message: "Stok menu tidak mencukupi",
      });
    }

    // Kalau cart belum ada, buat baru
    if (!cart) {
      const newCart = new Cart({
        user: req.user.id,
        menus: [
          {
            menu: menuId,
            quantity: qty,
          },
        ],
      });

      await newCart.save();
      return res.status(201).json({
        success: true,
        message: "Berhasil menambahkan menu ke keranjang",
        data: newCart,
      });
    }

    let updatedCart;

    const existingItem = cart.menus.find(
      (item) => item.menu.toString() === menuId
    );

    if (existingItem) {
      // Update menu yang sudah ada
      updatedCart = await Cart.findOneAndUpdate(
        { user: req.user.id, "menus.menu": menuId },
        {
          $inc: {
            "menus.$.quantity": qty,
          },
        },
        { new: true }
      );
    } else {
      // Push menu baru ke cart
      updatedCart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: {
            menus: {
              menu: menuId,
              quantity: qty,
            },
          },
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil menambahkan menu ke keranjang",
      data: updatedCart,
    });
  } catch (error) {
    console.log("error in addToCart", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "menus.menu"
    );

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data keranjang",
      data: cart,
    });
  } catch (error) {
    console.log("error in getCart", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan",
      });
    }

    const item = cart.menus.find((item) => item.menu.toString() === id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan di keranjang",
      });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: { menus: { menu: id } },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus menu dari keranjang",
      data: updatedCart,
    });
  } catch (error) {
    console.log("error in removeFromCart", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: { menus: [] },
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Keranjang tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil mengosongkan keranjang",
      data: updatedCart,
    });
  } catch (error) {
    console.log("error in clearCart", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
    });
  }
};
