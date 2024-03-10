import React from "react";
import { UnlinkButton } from "./Button-Styled"; 
import { ReactComponent as UnlinkIcon } from "../../../assets/ArrowCircleRight.svg";

type UnlinkButtonComponentProps = {
  onClick: () => void;
};

const UnlinkButtonComponent: React.FC<UnlinkButtonComponentProps> = ({ onClick }) => (
  <UnlinkButton onClick={onClick}>
    Desvincular
    <UnlinkIcon />
  </UnlinkButton>
);

export default UnlinkButtonComponent;
