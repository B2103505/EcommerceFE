import axios from 'axios';
const API_URL = process.env.REACT_APP_API_KEY

const DISCOUNT_API = `${API_URL}/discount`;

export const getAllDiscounts = async () => {
    const res = await axios.get(`${DISCOUNT_API}/getAll`);
    return res.data;
};

export const createDiscount = async (data) => {
    const res = await axios.post(`${DISCOUNT_API}/create`, data);
    return res.data;
};

export const updateDiscount = async (id, data) => {
    const res = await axios.put(`${DISCOUNT_API}/update/${id}`, data);
    return res.data;
};

export const deleteDiscount = async (id) => {
    const res = await axios.delete(`${DISCOUNT_API}/delete/${id}`);
    return res.data;
};

export const getValidDiscounts = async () => {
    const res = await axios.get(`${DISCOUNT_API}/valid`);
    return res.data;
};
