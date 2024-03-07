import React from "react";
import { Customer } from "../../../types/customers";
import { ContainerCard } from "./style";

interface CardCustomerProps {
  customer: Customer;
}

const CardCustomer: React.FC<CardCustomerProps> = ({ customer }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <ContainerCard isChecked={isChecked}>
      <div className="ContainerData">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span>{customer.code}</span>
        <span>{customer.name}</span>
      </div>

      <span>{customer.network}</span>
    </ContainerCard>
  );
};

export default CardCustomer;