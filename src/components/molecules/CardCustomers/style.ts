import styled from "styled-components";

interface ContainerCardProps {
    isChecked: boolean;
  }

export const ContainerCard = styled.div<ContainerCardProps>`
  width: 590px;
  height: 45px;
  border-radius: 18px;
  padding: 12px 16px;
  gap: 12px;
  border: 1px solid ${props => (props.isChecked ? "#00BDFF" : "none")};
  background: #eaedee;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #121929;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    all: unset;
    height: 18px;
    width: 18px;
    border: 1px solid #00bdff;
    cursor: pointer;
    position: relative;
  }

  input:checked::after {
    content: "\\2713";
    font-size: 14px;
    line-height: 18px;
    color: #00bdff;
    position: absolute;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
  }

  .ContainerData {
    display: flex;
    gap: 15px;
  }
`;