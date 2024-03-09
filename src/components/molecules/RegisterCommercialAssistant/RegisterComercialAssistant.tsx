import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ButtonCancel,
  ButtonRegister,
  ContainerAllInputs,
  ContainerButtons,
  ContainerModal,
  Overlay,
  InputWrapper,
  Input,
} from "./styled";
import { CommercialAssistant } from "../../../types/customers";

const assistantSchema = z.object({
  name: z.string().min(1, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
});

type AssistantFormData = z.infer<typeof assistantSchema>;

interface RegisterCommercialAssistantProps {
  handleClose: () => void;
  handleCreate: (
    assistantData: Omit<CommercialAssistant, "id">
  ) => Promise<void>;
}

const RegisterCommercialAssistant: React.FC<
  RegisterCommercialAssistantProps
> = ({ handleClose, handleCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssistantFormData>({ resolver: zodResolver(assistantSchema) });

  const onSubmit: SubmitHandler<AssistantFormData> = async (data) => {
    console.log("Enviando dados:", data); // Log de debug
    handleCreate(data);
    handleClose();
  };

  return (
    <Overlay>
      <ContainerModal onSubmit={handleSubmit(onSubmit)} as="form">
        <h2>Cadastro de Cliente</h2>
        <ContainerAllInputs>
          <InputWrapper>
            <label>Nome Completo</label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Digite nome do assistente comercial"
            />
            <p>{errors.name?.message}</p>
          </InputWrapper>

          <InputWrapper>
            <label>Email</label>
            <Input
              type="text"
              {...register("email")}
              placeholder="Digite o email do assistente comercial"
            />
            <p>{errors.email?.message}</p>
          </InputWrapper>

          <InputWrapper>
            <label>Telefone</label>
            <Input
              type="text"
              {...register("phone")}
              placeholder="Digite o telefone do assistente comercial."
            />
            <p>{errors.phone?.message}</p>
            <ContainerButtons>
              <ButtonCancel type="button" onClick={handleClose}>
                Cancelar
              </ButtonCancel>
              <ButtonRegister type="submit">Salvar</ButtonRegister>
            </ContainerButtons>
          </InputWrapper>
        </ContainerAllInputs>
      </ContainerModal>
    </Overlay>
  );
};

export default RegisterCommercialAssistant;
