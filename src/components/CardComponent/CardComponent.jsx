import React from "react";
import { useNavigate } from "react-router-dom";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountProduct, WrapperPriceProduct, WrapperRateProduct } from "./style";
import { StarFilled } from '@ant-design/icons';

const CardComponent = ({ data }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (data?._id) {
            navigate(`/detail-product/${data._id}`);
        }
    };

    return (
        <WrapperCardStyle
            hoverable
            onClick={handleClick}
            style={{ width: 200, cursor: 'pointer' }}
            styles={{ body: { padding: 10 } }}
            cover={
                <img
                    alt={data?.Plant_Name || "Hình ảnh cây"}
                    src={data?.Plant_Images?.[0] || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                />
            }
        >
            <StyleNameProduct>{data?.Plant_Name}</StyleNameProduct>
            <WrapperRateProduct>
                <span style={{ marginRight: '15px' }}>
                    <span>{data?.Plant_averageRating?.toFixed(1) || "0.0"}</span>
                    <StarFilled style={{ fontSize: '14px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <span>|</span>
                <span style={{ marginLeft: '15px' }}>Đã bán {data?.Plant_Sold || 0}</span>
            </WrapperRateProduct>

            <WrapperPriceProduct>
                {data?.Plant_Price?.toLocaleString('vi-VN')}đ
                <WrapperDiscountProduct>
                    {data?.Discount || "-10%"}
                </WrapperDiscountProduct>
            </WrapperPriceProduct>
        </WrapperCardStyle>
    );
};

export default CardComponent;
