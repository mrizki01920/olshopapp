import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

// Fungsi untuk mengambil daftar produk
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Fungsi untuk mengambil detail produk berdasarkan ID
export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product detail:", error);
  }
};

// Fungsi untuk menambahkan produk ke keranjang
export const addToCart = async (cartItem) => {
  try {
    const response = await axios.post(`${BASE_URL}/carts`, {
      userId: 1, // Hardcoded user ID
      date: new Date().toISOString(),
      products: [
        {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        },
      ],
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Fungsi untuk mengambil keranjang berdasarkan user ID
export const getCartByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart by user:", error);
  }
};

// Fungsi untuk menghapus item dari keranjang
export const deleteCartItem = async (cartId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/carts/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
  }
};

// Fungsi untuk mengirim data pemesanan
export const postOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error posting order:", error);
  }
};