import React from "react";
import { RoundButton } from "./Button-Styled";
import { ReactComponent as RoundIcon } from "../../../assets/AddCustomers.svg";

type RoundButtonComponentProps = {
  onClick: () => void;
};

const RoundButtonComponent: React.FC<RoundButtonComponentProps> = ({
  onClick,
}) => (
  <RoundButton onClick={onClick}>
    <RoundIcon />
  </RoundButton>
);

export default RoundButtonComponent;
