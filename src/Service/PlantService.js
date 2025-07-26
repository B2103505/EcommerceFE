import axios from "axios"
const API_URL = process.env.REACT_APP_API_KEY

export const axiosJWT = axios.create()

export const getAllPlant = async (params = {}) => {
    const res = await axios.get(`${API_URL}/plant/getAllPlant`, { params });
    return res.data;
};

export const createPlant = async (plantData, access_token) => {
    const res = await axiosJWT.post(
        `${API_URL}/plant/create`,
        plantData,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );
    return res.data;
};

export const updatePlant = async (id, plantData, access_token) => {
    const res = await axiosJWT.put(
        `${API_URL}/plant/update/${id}`,
        plantData,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );
    return res.data;
};

export const getDetailPlant = async (id) => {
    const res = await axios.get(`${API_URL}/plant/detail/${id}`);
    return res.data;
};

export const deletePlant = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${API_URL}/plant/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );
    return res.data;
};

export const fetchPlantsByCategory = async (categoryId, page = 1, limit = 10) => {
    const res = await axios.get(`${API_URL}/plant/by-cate/${categoryId}?page=${page}&limit=${limit}`);
    return res.data;
};



