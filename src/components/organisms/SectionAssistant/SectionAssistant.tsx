/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import CardCustomer from "../../molecules/CardCustomers/CardCustomer";
import { CiSearch } from "react-icons/ci";
import {
  ContainerButtons,
  ContainerLegend,
  ContainerSearch,
  ContainerSectionAssistant,
  Count,
} from "./styled";
import UnlinkButtonComponent from "../../atoms/Button/UnlinkButtonComponent";
import { API_BASE_URL } from "../../../apiconfig";
import { useCommercialAssistant } from "../../../contexts/CommercialAssistantContext";


interface CommercialAssistant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Customer {
  id: string;
  code: string;
  name: string;
  network: string;
  CommercialAssistant?: CommercialAssistant | null;
}

interface SectionAssistantProps {
  selectedAssistantId?: string;
}

const SectionAssistant: React.FC<SectionAssistantProps> = () => {
  const {
    selectedAssistantId,
    selectedAssistantName,
    triggerRefresh,
    shouldRefresh,
  } = useCommercialAssistant();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!selectedAssistantId) return;

    const fetchAssistantCustomers = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/commercial-assistant/${selectedAssistantId}`
        );
        const data = await response.json();
        if (data && data.Customers) {
          setCustomers(data.Customers);
          setCustomerCount(data.Customers.length);
        } else {
          setCustomers([]);
          setCustomerCount(0);
        }
      } catch (error) {
        console.error(
          "Erro ao buscar clientes vinculados ao assistente:",
          error
        );
        setCustomers([]);
        setCustomerCount(0);
      }
    };

    fetchAssistantCustomers();
    if (shouldRefresh) {
      triggerRefresh();
    }
  }, [selectedAssistantId, shouldRefresh]);

  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate =
        selectedCustomers.length > 0 &&
        selectedCustomers.length < customers.length;
    }
  }, [selectedCustomers, customers]);

  const handleSelectCustomer = (customerId: string, isSelected: boolean) => {
    setSelectedCustomers((prev) =>
      isSelected
        ? [...prev, customerId]
        : prev.filter((id) => id !== customerId)
    );
  };

  const handleUnlinkCustomers = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/customer/unlink-customers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerIds: selectedCustomers }),
        }
      );
      if (response.ok) {
        const remainingCustomers = customers.filter(
          (customer) => !selectedCustomers.includes(customer.id)
        );
        setCustomers(remainingCustomers);
        setCustomerCount(remainingCustomers.length);
        setSelectedCustomers([]); 
      } else {
        alert("Erro ao desvincular clientes. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao desvincular clientes:", error);
      alert(
        "Erro ao desvincular clientes. Verifique o console para mais detalhes."
      );
    }
  };

  const fetchCustomers = useCallback(async () => {
    let url = `${API_BASE_URL}/customer/find`;
    if (searchTerm) {
      url = `${API_BASE_URL}/customer/search?searchTerm=${encodeURIComponent(
        searchTerm
      )}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCustomers(data.data || []);
      setCustomerCount(data.count || 0);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }, [selectedAssistantId, searchTerm]);

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      // Marca todos os clientes
      const allCustomerIds = customers.map((customer) => customer.id);
      setSelectedCustomers(allCustomerIds);
    } else {
      // Desmarca todos os clientes
      setSelectedCustomers([]);
    }
  };

  return (
    <ContainerSectionAssistant>
      <ContainerButtons>
        <div>
          <span>{`Carteira de ${
            selectedAssistantName || "Assistente não selecionado"
          }`}</span>
          <Count>{customerCount}</Count>
        </div>
        <div className="buttons">
          {<UnlinkButtonComponent onClick={handleUnlinkCustomers} />}
        </div>
      </ContainerButtons>

      <ContainerSearch>
        <CiSearch className="icon" onClick={() => fetchCustomers()} style={{cursor: "pointer"}}/>

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
            ref={selectAllCheckboxRef}
            type="checkbox"
            checked={
              selectedCustomers.length === customers.length &&
              customers.length > 0
            }
            onChange={(e) => {
              const isChecked = e.target.checked;
              setSelectedCustomers(isChecked ? customers.map((c) => c.id) : []);
            }}
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
    </ContainerSectionAssistant>
  );
};

export default SectionAssistant;
