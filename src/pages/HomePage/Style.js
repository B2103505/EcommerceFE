import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    padding: 12px 0;
`;


export const CategoryItemStyled = styled.div`
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #1890ff;
    color: white;
    border-color: #1890ff;
  }
`;

export const WrapperBtnMore = styled(ButtonComponent)`
    border-radius: 8px;
    background-color: #1890ff;
    color: #fff;
    font-weight: 500;
    padding: 4px 12px;
    height: auto;

    &:hover {
        background-color: #096dd9;
        color: #fff;
        span {
            color: #fff;
        }
    }
`;


export const WrapperProduct = styled.div`
    display: flex;
    justify-content:center;
    gap: 7px;
    flex-wrap: wrap;
    margin-top: 20px;
    align-items: center
`