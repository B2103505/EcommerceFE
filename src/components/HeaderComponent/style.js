import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
padding: 10px 120px;
background-color: rgb(26,148,255);
align-items: center;
gap: 16px;
flex-wrap: nowrap;
`

export const WrapperText = styled.span`
font-size: 20px;
color: #fff;
font-weight: bold;
`

export const WrapperHeaderAccount = styled.div`
display: flex;
align-item: center;
color: #fff;
gap: 10px;
font-size: 13px;
`

export const WrapperTextSmall = styled.span`
font-size: 13px;
color: #fff;
white-space: nowrap;
`

export const WrapperTextPopupUser = styled.p`
font-size: 14px;
white-space: nowrap;
cursor: pointer;
margin: 3px;
padding: 3px;
&:hover {
    background: blue;
    color: #fff;
    border-radius: 5px
}
`
