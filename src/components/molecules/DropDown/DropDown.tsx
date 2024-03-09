// DropDown.tsx
import React, { useEffect, useState } from "react";
import { useCommercialAssistant } from "../../../contexts/CommercialAssistantContext";
import RoundButtonComponent from "../../atoms/Button/RoundButtonComponent";
import { API_BASE_URL } from "../../../apiconfig";
import RegisterCommercialAssistant from "../RegisterCommercialAssistant/RegisterComercialAssistant";

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

  // A função para criar um novo assistente comercial
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
        fetchAssistants(); // Recarrega a lista de assistentes
        setIsModalOpen(false); // Fecha o modal
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
      <div>
        <label htmlFor="assistants">Selecione o Assistente Comercial</label>
        <select name="assistants" id="assistants" onChange={handleSelectChange}>
          <option value="default">Selecione um Assistente</option>
          {assistants.map((assistant) => (
            <option key={assistant.id} value={assistant.id}>
              {assistant.name}
            </option>
          ))}
        </select>
        <RoundButtonComponent onClick={handleClickOpenModal} />
      </div>
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
