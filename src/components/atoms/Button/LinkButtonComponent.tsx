import React from "react";
import { LinkButton } from "./Button-Styled";
import { ReactComponent as LinkedCustomers } from "../../../assets/LinkedCustomers.svg";


type AddButtonComponentProps = {
  onClick: () => void; 
};

const LinkButtonComponent: React.FC<AddButtonComponentProps> = ({
  onClick,
}) => (
  <LinkButton onClick={onClick}>
    Vincular
    <LinkedCustomers />
  </LinkButton>
);

export default LinkButtonComponent;
