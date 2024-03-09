import React, { createContext, useContext, useState, ReactNode } from "react";

interface CommercialAssistantContextType {
  selectedAssistantId: string | null;
  setSelectedAssistantId: (id: string | null) => void;
  selectedAssistantName: string | null;
  setSelectedAssistantName: (name: string | null) => void;
}

const defaultValue: CommercialAssistantContextType = {
  selectedAssistantId: null,
  setSelectedAssistantId: () => null,
  selectedAssistantName: null,
  setSelectedAssistantName: () => null,
};

const CommercialAssistantContext =
  createContext<CommercialAssistantContextType>(defaultValue);

export const useCommercialAssistant = () =>
  useContext(CommercialAssistantContext);

interface CommercialAssistantProviderProps {
  children: ReactNode;
}

export const CommercialAssistantProvider: React.FC<
  CommercialAssistantProviderProps
> = ({ children }) => {
  const [selectedAssistantId, setSelectedAssistantId] = useState<string | null>(
    null
  );
  const [selectedAssistantName, setSelectedAssistantName] = useState<
    string | null
  >(null);

  return (
    <CommercialAssistantContext.Provider
      value={{
        selectedAssistantId,
        setSelectedAssistantId,
        selectedAssistantName,
        setSelectedAssistantName, 
      }}
    >
      {children}
    </CommercialAssistantContext.Provider>
  );
};
