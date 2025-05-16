import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    }
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    color: rgb(56, 56, 63);
    text-align: center;
    margin-bottom: 5px;
`

export const WrapperRateProduct = styled.div`
    font-size: 12px;
    line-height: 16px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
`

export const WrapperPriceProduct = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: rgb(255, 66, 78);
    margin: 5px 0;
`

export const WrapperDiscountProduct = styled.span`
    font-size: 12px;
    color: rgb(255, 66, 78);
    margin-left: 15px;

`