import cartRepository from "../persistence/mongoDB/cart.repository.js";
import cartServices from "../services/cart.services.js";

const createCart = async (req, res) => {
  try {
    const cart = await cartServices.createCart();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
}

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartRepository.getById(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
}

const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartUpdate = await cartServices.addProductToCart(cid, pid);
    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
}

const deleteProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartUpdate = await cartServices.deleteProductToCart(cid, pid);
    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
}

const updateQuantityProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body
    const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));
    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
}

const clearProductsToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.clearProductsToCart(cid);
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
}

const purchaseCart = async (req = request, res = response) => {
  try {
      const { cid } = req.params;
      const cart = await cartServices.getCartById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

      const total = await cartServices.purchaseCart(cid);
      const ticket = await ticketServices.createTicket(req.user.email, total);

      res.status(200).json({ status: "success", ticket });
  } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};



export default {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
  purchaseCart
};