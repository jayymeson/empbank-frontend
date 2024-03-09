import React, { useEffect, useState, useCallback } from "react";
import CardCustomer from "../../molecules/CardCustomers/CardCustomer";
import { CiSearch } from "react-icons/ci";
import {
  ContainerButtons,
  ContainerLegend,
  ContainerSearch,
  ContainerSectionCustomer,
  Count,
} from "./styled";
import AddButtonComponent from "../../atoms/Button/AddButtonComponent";
import LinkButtonComponent from "../../atoms/Button/LinkButtonComponent";
import { API_BASE_URL } from "../../../apiconfig";
import { useCommercialAssistant } from "../../../contexts/CommercialAssistantContext";
import { Customer } from "../../../types/customers";
import RegisterCustomer from "../../molecules/RegisterCustomers/RegisterCustomers";

const SectionCustomer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const { selectedAssistantId } = useCommercialAssistant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCustomers = useCallback(async () => {
    let url = `${API_BASE_URL}/customer/find`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCustomers(data.data || []);
      setCustomerCount(data.count || 0);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }, [selectedAssistantId]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleAddCustomer = () => {
    setIsModalOpen(true);
  };

  const handlelinkCustomer = () => {
    console.log("Lógica para desvincular um cliente.");
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <ContainerSectionCustomer>
      <ContainerButtons>
        <div>
          <span>Clientes (Não vinculado)</span>
          <Count>{customerCount}</Count>
        </div>
        <div className="buttons">
          <AddButtonComponent onClick={handleAddCustomer} />
          <LinkButtonComponent onClick={handlelinkCustomer} />
        </div>
      </ContainerButtons>
      <ContainerSearch>
        <CiSearch className="icon" />
        <input type="text" placeholder="Buscar" />
      </ContainerSearch>
      <ContainerLegend>
        <div className="labelData">
          <input type="checkbox" />
          <span>Código</span>
          <span>Parceiro</span>
        </div>
        <span>Rede</span>
      </ContainerLegend>
      {customers.map((customer) => (
        <CardCustomer key={customer.id} customer={customer} />
      ))}
      {isModalOpen && (
        <RegisterCustomer
          handleClose={() => setIsModalOpen(false)}
          onCustomerCreated={fetchCustomers}
        />
      )}
    </ContainerSectionCustomer>
  );
};

export default SectionCustomer;
