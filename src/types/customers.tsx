export interface CommercialAssistant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  network: string;
  CommercialAssistant?: CommercialAssistant | null;
}
