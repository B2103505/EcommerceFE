import axios from 'axios';
const API_URL = process.env.REACT_APP_API_KEY;

const CART_API = `${API_URL}/cart`;

export const addToCart = async (data) => {
    try {
        const response = await axios.post(`${CART_API}/add`, data);
        return response.data;
    } catch (error) {
        return { status: "ERROR", message: error.message };
    }
};

export const getCartByUserId = async (userId) => {
    try {
        const response = await axios.get(`${CART_API}/${userId}`);
        return response.data;
    } catch (error) {
        return { status: "ERROR", message: error.message };
    }
};

export const updateCartItem = async (data) => {
    try {
        const response = await axios.put(`${CART_API}/update`, data);
        return response.data;
    } catch (error) {
        return { status: "ERROR", message: error.message };
    }
};

export const deleteCartItem = async (cartItemId) => {
    try {
        const response = await axios.delete(`${CART_API}/delete/${cartItemId}`);
        return response.data;
    } catch (error) {
        return { status: "ERROR", message: error.message };
    }
};

export const clearCart = async (userId) => {
    try {
        const response = await axios.delete(`${CART_API}/clear/${userId}`);
        return response.data;
    } catch (error) {
        return { status: "ERROR", message: error.message };
    }
};
