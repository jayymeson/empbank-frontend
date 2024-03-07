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
import UnlinkButtonComponent from "../../atoms/Button/UnlinkButtonComponent";

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

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:3010/customer/unlink-customers");
        const data = await response.json();
        setCustomers(data.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const fetchCustomerCount = async () => {
      try {
        const response = await fetch("http://localhost:3020/customer/find");
        const data = await response.json();
        setCustomerCount(data.count);
      } catch (error) {
        console.error("Erro ao buscar a contagem de clientes:", error);
      }
    };

    fetchCustomers();
    fetchCustomerCount();
  }, []);

  // Funções de manipulação de cliques nos botões
  const handleAddCustomer = () => {
    console.log("Lógica para adicionar um cliente.");
    // Implemente a lógica de adicionar um cliente aqui
  };

  const handleUnlinkCustomer = () => {
    console.log("Lógica para desvincular um cliente.");
    // Implemente a lógica de desvincular um cliente aqui
  };

  return (
    <ContainerSectionCustomer>
      <ContainerButtons>
        <div>
          <span>{customers.some(customer => customer.CommercialAssistant) ? `Carteira de ${customers.find(customer => customer.CommercialAssistant)?.CommercialAssistant?.name}` : 'Clientes (Não vinculado)'}</span>
          <Count>{customerCount}</Count>
        </div>
        <div className="buttons">
          {customers.some(customer => !customer.CommercialAssistant) ? (
            <AddButtonComponent onClick={handleAddCustomer} />
          ) : (
            <UnlinkButtonComponent onClick={handleUnlinkCustomer} />
          )}
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
    </ContainerSectionCustomer>
  );
};

export default SectionCustomer;
