import axios from 'axios';
const API_URL = process.env.REACT_APP_API_KEY

const CATEGORY_API = `${API_URL}/category`;

export const getAllCategory = async () => {
    const res = await axios.get(`${CATEGORY_API}/getAll`);
    return res.data;
};

export const createCategory = async (data, token) => {
    const res = await axios.post(`${CATEGORY_API}/create`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const updateCategory = async (id, data, token) => {
    const res = await axios.put(`${CATEGORY_API}/update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const deleteCategory = async (id, token) => {
    const res = await axios.delete(`${CATEGORY_API}/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
