import styled from "styled-components";

export const ContainerModal = styled.form`
  width: 800px;
  height: 479px; 
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
  background-color: #ffffff;
  gap: 40px; 
  position: fixed;
  top: 273px; 
  left: 320px; 
  align-self: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #121929;
  }
`;

export const ContainerAllInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border: 1px solid #eaedee;
  border-radius: 18px;

  .lineInput {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  label {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #121929;
  }

  input {
    height: 43px;
    padding: 12px;
    border: 1px solid #1219291f;
    border-radius: 12px;

    &:focus {
      outline: none;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Input = styled.input`
  width: 704px;
  height: 43px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #1219291f;
  &:focus {
    outline: none;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 24px;
`;

export const ButtonCancel = styled.button`
  height: 43px;
  width: 255px;
  padding: 12px 24px;
  background: #1219291f;
  border-radius: 24px;
  border: none;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export const ButtonRegister = styled.button`
  height: 43px;
  width: 255px;
  padding: 12px 24px;
  border-radius: 24px;
  border: none;
  background: #00bdff;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
