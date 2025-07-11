import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountProduct, WrapperPriceProduct, WrapperRateProduct } from "./style";
import { StarFilled } from '@ant-design/icons';
const CardComponent = ({ data }) => {
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 200 }}
            styles={{ body: { padding: 10 } }}
            cover={
                <img alt={data?.Plant_Name || "Hình ảnh cây"}
                    src={data?.Plant_Image || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}>

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
    )
}

export default CardComponent;