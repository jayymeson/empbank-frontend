import React from "react";
import { Customer } from "../../../types/customers";
import { ContainerCard } from "./style";

interface CardCustomerProps {
  customer: Customer;
  isSelected?: boolean;
  onSelectCustomer?: (customerId: string, isSelected: boolean) => void;
}

const CardCustomer: React.FC<CardCustomerProps> = ({
  customer,
  isSelected = false,
  onSelectCustomer,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectCustomer?.(customer.id, event.target.checked);
  };

  return (
    <ContainerCard $isChecked={isSelected}>
      <div className="ContainerData">
        <input
          type="checkbox"
          checked={isSelected}
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
