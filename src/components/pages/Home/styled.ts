import styled from "styled-components";

export const ContainerPage = styled.div`
  min-height: 100vh;
  padding-left: 85px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  background-color: #eaedee;
`;

export const PageContent = styled.div`
  margin-left: 85px;
  width: calc(100% - 85px);
  display: flex;
  flex-direction: column;

  h1 {
    margin-top: 32px;
  }
`;

export const ContainerSections = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  margin-top: 20px;
`;
