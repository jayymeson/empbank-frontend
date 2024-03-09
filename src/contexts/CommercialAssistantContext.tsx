import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

interface CommercialAssistantContextType {
  selectedAssistantId: string | null;
  setSelectedAssistantId: (id: string | null) => void;
  selectedAssistantName: string | null;
  setSelectedAssistantName: (name: string | null) => void;
  shouldRefresh: boolean;
  triggerRefresh: () => void;
}

const CommercialAssistantContext = createContext<
  CommercialAssistantContextType | undefined
>(undefined);

export const useCommercialAssistant = () => {
  const context = useContext(CommercialAssistantContext);
  if (!context) {
    throw new Error(
      "useCommercialAssistant must be used within a CommercialAssistantProvider"
    );
  }
  return context;
};

export const CommercialAssistantProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedAssistantId, setSelectedAssistantId] = useState<string | null>(
    null
  );
  const [selectedAssistantName, setSelectedAssistantName] = useState<
    string | null
  >(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const triggerRefresh = useCallback(() => {
    setShouldRefresh((prev) => !prev); // Simplesmente inverte o estado para disparar uma atualização
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      // Este useEffect no contexto é apenas demonstrativo, pois o triggerRefresh já faz o trabalho necessário
      console.log("shouldRefresh changed", shouldRefresh);
    }
  }, [shouldRefresh]);

  return (
    <CommercialAssistantContext.Provider
      value={{
        selectedAssistantId,
        setSelectedAssistantId,
        selectedAssistantName,
        setSelectedAssistantName,
        shouldRefresh,
        triggerRefresh,
      }}
    >
      {children}
    </CommercialAssistantContext.Provider>
  );
};
