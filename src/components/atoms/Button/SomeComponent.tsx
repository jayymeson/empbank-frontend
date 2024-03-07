import React from "react";
import AddButtonComponent from "./AddButtonComponent";

const SomeComponent = () => (
  <div>
    <AddButtonComponent onClick={() => console.log("Botão clicado!")} />
  </div>
);

export default SomeComponent;
