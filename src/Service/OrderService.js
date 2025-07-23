import axios from 'axios';

export const createOrder = async (orderData) => {
    return await axios.post(`${process.env.REACT_APP_API_KEY}/order`, orderData);
};

export const getOrdersByUser = async (userId) => {
    return await axios.get(`${process.env.REACT_APP_API_KEY}/order/user/${userId}`);
};

export const getOrderById = async (orderId) => {
    return await axios.get(`${process.env.REACT_APP_API_KEY}/orders/${orderId}`);
};

export const updateOrderStatus = async (orderId, statusId) => {
    return await axios.put(`${process.env.REACT_APP_API_KEY}/order/${orderId}/status`, { Order_Status_Id: statusId });
};

export const deleteOrder = async (orderId) => {
    return await axios.delete(`${process.env.REACT_APP_API_KEY}/order/${orderId}`);
};

export const getAllOrders = async () => {
    return await axios.get(`${process.env.REACT_APP_API_KEY}/order`);
};
