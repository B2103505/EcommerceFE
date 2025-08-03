import { Rate, Avatar, List, Typography, Image, Popconfirm, Button, Space, message } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;

const ReviewList = ({ reviews, currentUserId, onEdit, onDelete }) => {
    const handleDelete = async (reviewId) => {
        try {
            await onDelete(reviewId);
            message.success('Đã xoá đánh giá');
        } catch (err) {
            message.error('Xoá đánh giá thất bại');
        }
    };

    return (
        <div style={{ padding: '16px', background: '#fafafa', borderRadius: 8 }}>
            <List
                itemLayout="vertical"
                dataSource={reviews}
                renderItem={(review) => {
                    const user = review.User_Id;
                    const avatarUrl = user?.User_Avatar || null;
                    const userName = user?.User_Fullname || 'Người dùng ẩn danh';
                    const createdAt = review?.createdAt
                        ? dayjs(review.createdAt).format('DD/MM/YYYY HH:mm')
                        : '';

                    const isOwner = currentUserId === user?._id;

                    return (
                        <List.Item style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <Avatar
                                    src={avatarUrl}
                                    icon={!avatarUrl && <UserOutlined />}
                                    size={64}
                                />

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Text strong style={{ fontSize: 16 }}>{userName}</Text>
                                        <Text type="secondary" style={{ fontSize: 13 }}>{createdAt}</Text>
                                    </div>

                                    <div style={{ margin: '4px 0' }}>
                                        <Rate disabled allowHalf value={review.Review_Rate} />
                                    </div>

                                    <Paragraph style={{ margin: '8px 0' }}>
                                        {review.Review_Comment}
                                    </Paragraph>

                                    {review.Review_Images?.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {review.Review_Images.map((url) => (
                                                <Image
                                                    key={url}
                                                    src={url}
                                                    width={100}
                                                    height={100}
                                                    style={{
                                                        objectFit: 'cover',
                                                        borderRadius: 6,
                                                        border: '1px solid #d9d9d9',
                                                    }}
                                                    preview
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {isOwner && (
                                        <Space style={{ marginTop: 12 }}>
                                            <Button icon={<EditOutlined />} onClick={() => onEdit(review)}>
                                                Sửa
                                            </Button>
                                            <Popconfirm
                                                title="Bạn có chắc muốn xoá đánh giá này không?"
                                                okText="Xoá"
                                                cancelText="Huỷ"
                                                onConfirm={() => handleDelete(review._id)}
                                            >
                                                <Button icon={<DeleteOutlined />} danger>
                                                    Xoá
                                                </Button>
                                            </Popconfirm>
                                        </Space>
                                    )}
                                </div>
                            </div>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};

export default ReviewList;
