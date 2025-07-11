import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 100%;
`

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #d9f3e1, #b8d8c0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export const ProfileWrapper = styled.div`
  width: 600px;
  padding: 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-family: 'Segoe UI', sans-serif;
`;