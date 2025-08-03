import React, { useEffect, useState } from 'react';
import { getReviewsByPlant, getUserReview, checkHasPurchased, submitReview, deleteReview } from '../../Service/ReviewService';
import ReviewList from './ReviewList';
import MyReviewForm from './MyReviewForm';
import { Modal, message, Typography, Spin } from 'antd';

const { Title } = Typography;

const ReviewSection = ({ plantId, userId }) => {
    const [reviews, setReviews] = useState([]);
    const [myReview, setMyReview] = useState(null);
    const [canReview, setCanReview] = useState(false);
    const [loading, setLoading] = useState(true);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editReviewData, setEditReviewData] = useState(null);

    useEffect(() => {
        fetchReviews();
        if (userId) {
            checkHasPurchased(userId, plantId).then(setCanReview);
            getUserReview(userId, plantId).then(setMyReview);
        }
    }, [plantId, userId]);



    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await getReviewsByPlant(plantId);
            setReviews(res.data || []);
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá:", error);
            message.error("Không thể tải danh sách đánh giá.");
        } finally {
            setLoading(false);
        }
    };

    const handleReviewSubmit = async (data) => {
        const payload = {
            User_Id: userId,
            Plant_Id: plantId,
            Review_Rate: data.Review_Rate,
            Review_Comment: data.Review_Comment,
            Review_Images: data.Review_Images
        };

        try {
            await submitReview(payload);
            message.success("Đánh giá đã được gửi!");
            setEditModalVisible(false);
            fetchReviews();
            getUserReview(userId, plantId).then(setMyReview);
        } catch (err) {
            message.error("Không thể gửi đánh giá.");
        }
    };

    const handleEditReview = (review) => {
        setEditReviewData(review);
        setEditModalVisible(true);
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview(reviewId);
            message.success("Đã xoá đánh giá.");
            fetchReviews();
            getUserReview(userId, plantId).then(setMyReview);
        } catch (err) {
            message.error("Không thể xoá đánh giá.");
        }
    };

    return (
        <div style={{ marginTop: 24 }}>
            <Title level={4}>Đánh giá sản phẩm</Title>

            {canReview && (
                <MyReviewForm
                    initialReview={null}
                    plantId={plantId}
                    userId={userId}
                    onSubmit={handleReviewSubmit}
                />
            )}

            {loading ? (
                <Spin tip="Đang tải đánh giá..." />
            ) : reviews.length > 0 ? (
                <ReviewList
                    reviews={reviews}
                    currentUserId={userId}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                />
            ) : (
                <p>Chưa có đánh giá nào cho sản phẩm này.</p>
            )}

            {/* Modal sửa đánh giá */}
            <Modal
                title="Chỉnh sửa đánh giá"
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={null}
            >
                {editReviewData && (
                    <MyReviewForm
                        initialReview={editReviewData}
                        plantId={plantId}
                        userId={userId}
                        onSubmit={handleReviewSubmit}
                    />
                )}
            </Modal>
        </div>
    );
};

export default ReviewSection;
