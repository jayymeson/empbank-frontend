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
import { API_BASE_URL } from "../../../apiconfig";

const assistantSchema = z.object({
  name: z.string().min(1, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
});

type AssistantFormData = z.infer<typeof assistantSchema>;

interface RegisterCommercialAssistantProps {
  handleClose: () => void;
}

const RegisterCommercialAssistant: React.FC<
  RegisterCommercialAssistantProps
> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssistantFormData>({
    resolver: zodResolver(assistantSchema),
  });

  const onSubmit: SubmitHandler<AssistantFormData> = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/commercial-assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro na resposta:", errorData);
        throw new Error(
          `Erro na solicitação: ${response.status} ${errorData.message}`
        );
      }

      const responseData = await response.json();
      console.log(responseData);
      alert("Assistente Comercial cadastrado com sucesso!");
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar o assistente comercial:", error);
      alert("Erro ao salvar o assistente comercial.");
    }
  };

  return (
    <Overlay>
      <ContainerModal onSubmit={handleSubmit(onSubmit)}>
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
          </InputWrapper>
        </ContainerAllInputs>

        <ContainerButtons>
          <ButtonCancel type="button" onClick={handleClose}>
            Cancelar
          </ButtonCancel>
          <ButtonRegister type="submit">Salvar</ButtonRegister>
        </ContainerButtons>
      </ContainerModal>
    </Overlay>
  );
};

export default RegisterCommercialAssistant;
