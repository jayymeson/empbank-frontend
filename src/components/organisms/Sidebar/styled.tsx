import styled from "styled-components";

export const SidebarContainer = styled.div`
  min-height: 97.4vh;
  width: 85px;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 20px;
`;

export const IconWrapper = styled.div`
  margin: 10px 0;
`;

export const NavigationGroup = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const LowerGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
