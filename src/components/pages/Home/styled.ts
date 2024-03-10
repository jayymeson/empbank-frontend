import styled from "styled-components";

export const ContainerPage = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: row;
  gap: 32px;
  background-color: #eaedee;
`;

export const PageContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin-top: 32px;
  }
`;
