import axios from "axios";

const API = process.env.REACT_APP_API_KEY;

// Tổng quan: doanh thu, số đơn, sản phẩm bán...
export const getSummary = async () => {
    const res = await axios.get(`${API}/stats/summary`);
    return res.data;
};

// Doanh thu theo thời gian
export const getRevenueSeries = async (from, to) => {
    const res = await axios.get(`${API}/stats/revenue-series`, {
        params: { from, to }
    });
    return res.data;
};


// Phân bổ trạng thái đơn hàng
export const getOrderStatus = async () => {
    const res = await axios.get(`${API}/stats/order-status`);
    return res.data;
};

// Phân bổ theo phương thức thanh toán
export const getPaymentMethods = async () => {
    const res = await axios.get(`${API}/stats/payment-methods`);
    return res.data;
};

// Top sản phẩm bán chạy
export const getTopPlants = async () => {
    const res = await axios.get(`${API}/stats/top-plants`);
    return res.data;
};

// Sản phẩm sắp hết hàng
export const getLowStock = async () => {
    const res = await axios.get(`${API}/stats/low-stock`);
    return res.data;
};

export const getTopPlantDetail = async () => {
    const res = await axios.get(`${API}/stats/top-plant-detail`);
    return res.data
}
