import React from "react";
import AddButtonComponent from "../button/AddButtonComponent";

const SomeComponent = () => (
  <div>
    <AddButtonComponent onClick={() => console.log("Botão clicado!")} />
  </div>
);

export default SomeComponent;
