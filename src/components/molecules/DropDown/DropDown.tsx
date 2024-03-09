// DropDown.tsx
import React, { useEffect, useState } from "react";
import { useCommercialAssistant } from "../../../contexts/CommercialAssistantContext"; // ajuste o caminho conforme necessário
import RoundButtonComponent from "../../atoms/Button/RoundButtonComponent";
import RegisterCustomer from "../RegisterCustomers/RegisterCustomers";
import { API_BASE_URL } from "../../../apiconfig";

interface CommercialAssistant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const DropDown: React.FC = () => {
  const [assistants, setAssistants] = useState<CommercialAssistant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedAssistantId, setSelectedAssistantName } =
    useCommercialAssistant();

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/commercial-assistant`);
        const data = await response.json();
        setAssistants(data || []);
      } catch (error) {
        console.error("Erro ao buscar assistentes comerciais:", error);
      }
    };

    fetchAssistants();
  }, []);

  const handleClickOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const selectedAssistant = assistants.find(
      (assistant) => assistant.id === id
    );
    setSelectedAssistantId(id);
    setSelectedAssistantName(selectedAssistant ? selectedAssistant.name : null);
  };

  return (
    <>
      <div>
        <label htmlFor="assistants">Selecione o Assistente Comercial</label>
        <select name="assistants" id="assistants" onChange={handleSelectChange}>
          {assistants.map((assistant) => (
            <option key={assistant.id} value={assistant.id}>
              {assistant.name}
            </option>
          ))}
        </select>
        <RoundButtonComponent onClick={handleClickOpenModal} />
      </div>
      {isModalOpen && (
        <RegisterCustomer handleClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default DropDown;
