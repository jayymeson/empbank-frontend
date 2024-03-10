// DropDown.tsx
import React, { useEffect, useState } from "react";
import { useCommercialAssistant } from "../../../contexts/CommercialAssistantContext";
import RoundButtonComponent from "../../atoms/Button/RoundButtonComponent";
import { API_BASE_URL } from "../../../apiconfig";
import RegisterCommercialAssistant from "../RegisterCommercialAssistant/RegisterComercialAssistant";
import { DropDownContainer, Select, SelectContainer } from "./style";

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

  const fetchAssistants = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/commercial-assistant`);
      const data = await response.json();
      setAssistants(data || []);
    } catch (error) {
      console.error("Erro ao buscar assistentes comerciais:", error);
    }
  };

  useEffect(() => {
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
    setSelectedAssistantId(id === "default" ? null : id);
    setSelectedAssistantName(selectedAssistant ? selectedAssistant.name : "");
  };

  const handleCreateAssistant = async (
    assistantData: Omit<CommercialAssistant, "id">
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/commercial-assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assistantData),
      });
      if (response.ok) {
        alert("Assistente comercial cadastrado com sucesso!");
        fetchAssistants(); 
        setIsModalOpen(false); 
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar assistente comercial: ${errorData.message}`);
      }
    } catch (error) {
      alert("Erro ao cadastrar assistente comercial.");
      console.error(error);
    }
  };

  return (
    <>
      <DropDownContainer>
        <label htmlFor="assistants">Selecione o Assistente Comercial</label>
        <SelectContainer>
          <Select
            name="assistants"
            id="assistants"
            onChange={handleSelectChange}
          >
            <option value="default">
              Selecione um Assistente
            </option>
            {assistants.map((assistant) => (
              <option key={assistant.id} value={assistant.id}>
                {assistant.name}
              </option>
            ))}
          </Select>
          <RoundButtonComponent onClick={handleClickOpenModal} />
        </SelectContainer>
      </DropDownContainer>
      {isModalOpen && (
        <RegisterCommercialAssistant
          handleClose={() => setIsModalOpen(false)}
          handleCreate={handleCreateAssistant}
        />
      )}
    </>
  );
};

export default DropDown;
