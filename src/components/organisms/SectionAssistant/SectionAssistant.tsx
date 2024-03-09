// Importações necessárias
import React, { useEffect, useState } from "react";
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

// Definições de interface
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
  const { selectedAssistantId, selectedAssistantName } =
    useCommercialAssistant();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    if (!selectedAssistantId) return;

    const fetchAssistantCustomers = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/commercial-assistant/${selectedAssistantId}`
        );
        const data = await response.json();
        console.log("Dados recebidos do assistente:", data);
        if (data && data.Customers) {
          setCustomers(data.Customers);
          setCustomerCount(data.Customers.length);
        } else {
          // Trate o caso de não haver clientes ou a resposta ser inesperada
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

    if (selectedAssistantId) {
      fetchAssistantCustomers();
    }
  }, [selectedAssistantId]);

  const handleUnlinkCustomer = () => {
    console.log("Lógica para desvincular um cliente.");
    // Implemente a lógica de desvincular um cliente aqui
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
          {<UnlinkButtonComponent onClick={handleUnlinkCustomer} />}
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
    </ContainerSectionAssistant>
  );
};

export default SectionAssistant;
