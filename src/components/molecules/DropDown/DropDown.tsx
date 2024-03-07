import React, { useEffect, useState } from "react";
import RoundButtonComponent from "../../atoms/Button/RoundButtonComponent";
import RegisterCustomer from "../RegisterCustomers/RegisterCustomers";

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

const DropDown: React.FC = () => {
  const [assistants, setAssistants] = useState<CommercialAssistant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:3020/customer/find");
        const data = await response.json();
        const fetchedCustomers: Customer[] = data.data;
        const commercialAssistants: CommercialAssistant[] = fetchedCustomers
          .map((customer) => customer.CommercialAssistant)
          .filter(
            (assistant): assistant is CommercialAssistant => assistant !== null
          );

        setAssistants(
          Array.from(
            new Set(
              commercialAssistants.map((assistant) => JSON.stringify(assistant))
            )
          ).map((str) => JSON.parse(str) as CommercialAssistant)
        );
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleClickOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div>
        <div>
          <label>Selecione o Assistente Comercial</label>
          <select name="assistants" id="assistants">
            {assistants.map((assistant, index) => (
              <option key={index} value={assistant.id}>
                {assistant.name}
              </option>
            ))}
          </select>
        </div>
        <RoundButtonComponent onClick={handleClickOpenModal} />
      </div>
      {isModalOpen && (
        <RegisterCustomer handleClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default DropDown;
