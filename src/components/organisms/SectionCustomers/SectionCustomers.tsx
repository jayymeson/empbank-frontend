// Importações necessárias
import React, { useEffect, useState } from "react";
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

const SectionCustomer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const { selectedAssistantId } = useCommercialAssistant();

  useEffect(() => {
    const fetchCustomers = async () => {
      let url = `${API_BASE_URL}/customer/find`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setCustomers(data.data || []);
        setCustomerCount(data.count || 0);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchCustomers();
  }, [selectedAssistantId]);

  // Funções de manipulação de cliques nos botões
  const handleAddCustomer = () => {
    console.log("Lógica para adicionar um cliente.");
    // Implemente a lógica de adicionar um cliente aqui
  };

  const handlelinkCustomer = () => {
    console.log("Lógica para desvincular um cliente.");
    // Implemente a lógica de desvincular um cliente aqui
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

      {customers.map((customer) => {
        return <CardCustomer key={customer.id} customer={customer} />;
      })}
    </ContainerSectionCustomer>
  );
};

export default SectionCustomer;
