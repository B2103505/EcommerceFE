import axios from 'axios';

const API = process.env.REACT_APP_API_KEY;

// Lấy danh sách đánh giá theo Plant_Id
export const getReviewsByPlant = async (plantId) => {
    return await axios.get(`${API}/review/plant/${plantId}`);
};

// Lấy đánh giá của 1 user cho 1 plant
export const getUserReview = async (userId, plantId) => {
    return await axios.get(`${API}/review/user/${userId}/plant/${plantId}`);
};

// Kiểm tra user đã mua plant chưa (để được đánh giá)
export const checkHasPurchased = async (userId, plantId) => {
    const res = await axios.get(`${API}/order/has-purchased/${userId}/${plantId}`);
    return res.data.hasPurchased;
};

// Tạo mới hoặc cập nhật review
export const submitReview = async (reviewData) => {
    return await axios.post(`${API}/review`, reviewData);
};

// Xoá đánh giá
export const deleteReview = async (reviewId) => {
    const res = await axios.delete(`${API}/review/${reviewId}`);
    return res.data;
};
