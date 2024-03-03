import styled from "styled-components";

export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 16px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

export const AddButton = styled(BaseButton)`
  background-color: #00bdff;
  width: 200px;
  height: 35px;
  border-radius: 18px;
  padding: 4px 16px 4px 16px;
  color: white;
  gap: 20px;
  size: 12px;
`;

export const LinkUnlinkButton = styled(BaseButton)`
  width: 117px;
  height: 35px;
  border-radius: 18px;
  padding: 4px 16px 4px 16px;
  color: white;
  gap: 10px;
  size: 12px;
`;

export const LinkButton = styled(LinkUnlinkButton)`
  background-color: #5e17f5;
  width: 117px;
  height: 35px;
  border-radius: 18px;
  padding: 4px 16px 4px 16px;
  color: white;
  gap: 10px;
  size: 12px;
`;

export const UnlinkButton = styled(LinkUnlinkButton)`
  background-color: #ff4e3a;
  width: 117px;
  height: 35px;
  border-radius: 18px;
  padding: 4px 16px 4px 16px;
  color: white;
  gap: 10px;
  size: 12px;
`;

export const RoundButton = styled(BaseButton)`
  background-color: #00bdff;
  width: 54px;
  height: 43px;
  border-radius: 22px;
  size: 12px;
`;
