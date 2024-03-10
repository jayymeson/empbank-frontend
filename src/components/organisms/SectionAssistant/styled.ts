import styled from "styled-components";

export const ContainerSectionAssistant = styled.section`
  width: 638px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 18px;
  padding: 24px;
  background-color: #ffffff;
  align-items: center;
`;

export const ContainerButtons = styled.div`
  width: 590px;
  display: flex;
  justify-content: space-between;

  span {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }

  .buttons {
    display: flex;
    gap: 8px;
  }
`;

export const ContainerLegend = styled.div`
  width: 590px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;

  .labelData {
    display: flex;
    gap: 15px;
  }

  span {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #121929a3;
  }

  input {
    all: unset;
    height: 13.5px;
    width: 13.5px;
    border: 1px solid #121929a3;
    cursor: pointer;
    position: relative;
  }

  input:checked::after {
    content: "\\2713";
    font-size: 14px;
    line-height: 18px;
    color: #121929a3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const ContainerCount = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Count = styled.div`
  width: 10px;
  height: 21px;
  padding: 0px 12px 0px 12px;
  border-radius: 18px;
  border: 1px solid #00bdff;
`;

export const ContainerSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    width: 50px;
    height: 32px;
    padding: 8px;
    border: 1px solid #1219291f;
    border-radius: 12px 0 0 12px;
    border-right: none;
  }

  input {
    width: 540px;
    height: 32px;
    padding: 8px 8px 8px 0;
    border: 1px solid #1219291f;
    border-radius: 0 12px 12px 0;
    border-left: none;

    &:focus {
      outline: none;
    }
  }
`;
