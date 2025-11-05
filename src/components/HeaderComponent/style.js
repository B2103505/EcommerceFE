import styled from 'styled-components';

export const WrapperHeader = styled.div`
  width: 100%;
  max-width: 100vw; // tránh tràn ngang
  background: rgb(26,148,255);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 10px 20px;
  box-sizing: border-box;

  @media(min-width: 768px){
    padding: 10px 60px;
  }

  @media(min-width: 1200px){
    padding: 10px 120px;
  }
`;

export const LogoText = styled.span`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const SearchWrapper = styled.div`
  flex: 1 1 auto; // co dãn vừa đủ
  max-width: 500px; // giới hạn max
  min-width: 150px; // giới hạn min
  margin: 0 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #fff;
  font-weight: 500;
  flex-shrink: 0;
  max-width: 200px; // tăng width
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SmallText = styled.span`
  font-size: 13px;
  color: #fff;
  white-space: nowrap;
  max-width: 80px; // tăng width
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 8px;
    .small-text {
      display: none; // ẩn chữ khi màn hình nhỏ
    }
  }
`;

export const PopupItem = styled.p`
  font-size: 14px;
  cursor: pointer;
  margin: 3px 0;
  padding: 5px 10px;
  border-radius: 6px;
  transition: all 0.2s;
  &:hover {
    background: rgba(61,110,53,0.9);
    color: #fff;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); }
`;
