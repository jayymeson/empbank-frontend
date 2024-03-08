import React, { ReactNode } from "react";
import { RoundButton } from "./Button-Styled";
import { ReactComponent as RoundIcon } from "../../../assets/AddCustomers.svg";

type RoundButtonComponentProps = {
  onClick: () => void;
  children?: ReactNode;
};

const RoundButtonComponent: React.FC<RoundButtonComponentProps> = ({
  onClick,
  children,
}) => (
  <RoundButton onClick={onClick}>
    {children}
    <RoundIcon />
  </RoundButton>
);

export default RoundButtonComponent;
