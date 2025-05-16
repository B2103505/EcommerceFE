import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountProduct, WrapperPriceProduct, WrapperRateProduct } from "./style";
import { StarFilled } from '@ant-design/icons';
const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 200 }}
            styles={{ body: { padding: 10 } }}
            cover={<img alt='example' src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>

            <StyleNameProduct>Hồng Môn</StyleNameProduct>
            <WrapperRateProduct>
                <span style={{ marginRight: '15px' }}>
                    <span>5.0 </span>
                    <StarFilled style={{ fontSize: '14px', color: 'rgb(217, 225, 61)' }} />
                </span>
                <span>|</span>
                <span style={{ marginLeft: '15px' }}>Đã bán 542</span>
            </WrapperRateProduct>

            <WrapperPriceProduct>
                250.000đ
                <WrapperDiscountProduct>
                    -10%
                </WrapperDiscountProduct>
            </WrapperPriceProduct>
        </WrapperCardStyle>
    )
}

export default CardComponent;