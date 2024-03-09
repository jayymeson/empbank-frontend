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
} from "./styled"; // Assegure-se que esses estilos estão corretamente importados
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
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit: SubmitHandler<CustomerFormData> = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Cliente cadastrado com sucesso!");
        onCustomerCreated(); // Chame a função de callback aqui
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
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="lineInput">
            <label htmlFor="code">Código</label>
            <input {...register("code")} type="text" id="code" />
            {errors.code && <p>{errors.code.message}</p>}
          </div>
          <div className="lineInput">
            <label htmlFor="network">Rede</label>
            <input {...register("network")} type="text" id="network" />
            {errors.network && <p>{errors.network.message}</p>}
          </div>
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

export default RegisterCustomer;
