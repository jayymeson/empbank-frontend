/* eslint-disable react-hooks/exhaustive-deps */
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
  const { selectedAssistantId, shouldRefresh, triggerRefresh } =
    useCommercialAssistant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllCustomers = useCallback(async () => {
    const url = `${API_BASE_URL}/customer/find`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCustomers(data.data || []);
      setCustomerCount(data.count || 0);
    } catch (error) {
      console.error("Erro ao buscar todos os clientes:", error);
    }
  }, [selectedAssistantId]);

  const searchCustomers = async () => {
    const url = `${API_BASE_URL}/customer/search?searchTerm=${encodeURIComponent(
      searchTerm.trim()
    )}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCustomers(data.data || []);
      setCustomerCount(data.count || 0);
    } catch (error) {
      console.error("Erro ao realizar busca específica de clientes:", error);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers, shouldRefresh]);

  const handleAddCustomer = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerRefresh();
  };

  const handleSelectCustomer = (customerId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCustomers((prev) => [...prev, customerId]);
    } else {
      setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
    }
  };

  const handleSelectAllCustomers = (isSelected: boolean) => {
    if (isSelected) {
      const allCustomerIds = customers.map((customer) => customer.id);
      setSelectedCustomers(allCustomerIds);
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleLinkCustomers = async () => {
    if (!selectedAssistantId) {
      alert("Por favor, selecione um assistente comercial.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/customer/link-customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerIds: selectedCustomers,
          commercialAssistantId: selectedAssistantId,
        }),
      });

      if (response.ok) {
        alert("Clientes vinculados com sucesso ao assistente comercial!");
        setSelectedCustomers([]);
        triggerRefresh();
      } else {
        alert("Erro ao vincular clientes. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao vincular clientes:", error);
      alert(
        "Erro ao vincular clientes. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <ContainerSectionCustomer>
      <ContainerButtons>
        <div>
          <span>Clientes (Não vinculado)</span>
          <Count>{customerCount}</Count>
        </div>
        <div className="buttons">
          <AddButtonComponent onClick={handleAddCustomer} />
          <LinkButtonComponent onClick={handleLinkCustomers} />
        </div>
      </ContainerButtons>
      <ContainerSearch>
        <CiSearch
          className="icon"
          onClick={searchCustomers}
          style={{ cursor: "pointer"}}
        />
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ContainerSearch>
      <ContainerLegend>
        <div className="labelData">
          <input
            type="checkbox"
            checked={
              selectedCustomers.length === customers.length &&
              customers.length > 0
            }
            onChange={(e) => handleSelectAllCustomers(e.target.checked)}
          />
          <span>Código</span>
          <span>Parceiro</span>
        </div>
        <span>Rede</span>
      </ContainerLegend>
      {customers.map((customer) => (
        <CardCustomer
          key={customer.id}
          customer={customer}
          isSelected={selectedCustomers.includes(customer.id)}
          onSelectCustomer={handleSelectCustomer}
        />
      ))}
      {isModalOpen && (
        <RegisterCustomer
          handleClose={handleCloseModal}
          onCustomerCreated={fetchAllCustomers} // Pode ajustar conforme a necessidade de atualização após criação
        />
      )}
    </ContainerSectionCustomer>
  );
};

export default SectionCustomer;
