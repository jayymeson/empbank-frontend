import React from "react";
import {
  ButtonCancel,
  ButtonRegister,
  ContainerAllInputs,
  ContainerButtons,
  ContainerModal,
} from "./styled";

const RegisterCustomer: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  return (
    <ContainerModal>
      <h2>Cadastro de Cliente</h2>
      <ContainerAllInputs>
        <div className="lineInput">
          <label>Nome Completo</label>
          <input type="text" />
        </div>

        <div className="lineInput">
          <label>Email</label>
          <input type="text" />
        </div>

        <div className="lineInput">
          <label>Telefone</label>
          <input type="text" />
        </div>
      </ContainerAllInputs>

      <ContainerButtons>
        <ButtonCancel onClick={handleClose}>Cancelar</ButtonCancel>
        <ButtonRegister>Salvar</ButtonRegister>
      </ContainerButtons>
    </ContainerModal>
  );
};

export default RegisterCustomer;
