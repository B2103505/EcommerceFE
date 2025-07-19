import { Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36,36,36);
    font-size: 20px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120)
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 28px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddress = styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;

        text-overflow: ellipsis;
    },
    span.change-address{
        color: rgb(11,116,229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        cursor: pointer;
    }
`

export const WrapperQuantityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 2px;
    border: 1px solid #ccc;
    width: 120px;
`

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number{
        width: 60px;
    }
    .ant-input-number-handler-wrap {
        display: none !important;
    }
`