import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
display: flex;
align-items: center;
gap: 30px;
justify-content: flex-start;
font-size: 16px;
height: 40px;
`

export const WrapperBtnMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13,92,182);
        span {
            color: #fff;
        }
    }
`

export const WrapperProduct = styled.div`
    display: flex;
    justify-content:center;
    gap: 7px;
    flex-wrap: wrap;
    margin-top: 20px;
    align-items: center
`