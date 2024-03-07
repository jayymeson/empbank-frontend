import React from "react";
import { AddButton } from "./Button-Styled"; // Supondo que você tenha este arquivo de estilos
import { ReactComponent as PlusIcon } from "../../../assets/AddCustomers.svg";

type AddButtonComponentProps = {
  onClick: () => void;
};

const AddButtonComponent: React.FC<AddButtonComponentProps> = ({ onClick }) => (
  <AddButton onClick={onClick}>
    <PlusIcon />
    Adicionar cliente
  </AddButton>
);

export default AddButtonComponent;
