import React, { useState } from "react";
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
  ErrorMessage, // Certifique-se de ter este estilo para o erro
} from "./styled";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../apiconfig";

const customerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  code: z.string().min(1, "Código é obrigatório"),
  network: z.string().min(1, "Rede é obrigatória"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface RegisterCustomerProps {
  handleClose: () => void;
  onCustomerCreated: () => void;
}

const RegisterCustomer: React.FC<RegisterCustomerProps> = ({
  handleClose,
  onCustomerCreated,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, 
    clearErrors, 
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });
  const [isCodeChecking, setIsCodeChecking] = useState(false);

  const checkCodeAvailability = async (code: string) => {
    setIsCodeChecking(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/customer/check-code?code=${encodeURIComponent(code)}`
      );
      const data = await response.json();
      if (data.message === "Code unavailable") {
        setError("code", {
          type: "manual",
          message: "Código indisponível",
        });
      } else {
        clearErrors("code");
      }
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
    }
    setIsCodeChecking(false);
  };

  const onSubmit: SubmitHandler<CustomerFormData> = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Cliente cadastrado com sucesso!");
        onCustomerCreated();
        handleClose();
      } else {
        const errorData = await response.json();
        toast.error(`Erro ao cadastrar cliente: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar cliente.");
      console.error(error);
    }
  };

  return (
    <Overlay>
      <ContainerModal onSubmit={handleSubmit(onSubmit)}>
        <h2>Cadastro de Cliente</h2>
        <ContainerAllInputs>
          <div className="lineInput">
            <label htmlFor="name">Nome Completo</label>
            <input {...register("name")} type="text" id="name" />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <div className="lineInput">
            <label htmlFor="code">Código</label>
            <input
              {...register("code")}
              type="text"
              id="code"
              onBlur={(e) => checkCodeAvailability(e.target.value)}
              disabled={isCodeChecking}
            />
            {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
          </div>
          <div className="lineInput">
            <label htmlFor="network">Rede</label>
            <input {...register("network")} type="text" id="network" />
            {errors.network && (
              <ErrorMessage>{errors.network.message}</ErrorMessage>
            )}
          </div>
        </ContainerAllInputs>
        <ContainerButtons>
          <ButtonCancel type="button" onClick={handleClose}>
            Cancelar
          </ButtonCancel>
          <ButtonRegister type="submit" disabled={isCodeChecking}>
            Salvar
          </ButtonRegister>
        </ContainerButtons>
      </ContainerModal>
    </Overlay>
  );
};

export default RegisterCustomer;
