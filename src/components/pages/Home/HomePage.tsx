import React from "react";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import SectionCustomer from "../../organisms/SectionCustomers/SectionCustomers";
import DropDown from "../../molecules/DropDown/DropDown";
import { ContainerPage, PageContent } from "./styled";
import SectionAssistant from "../../organisms/SectionAssistant/SectionAssistant";

const HomePage = () => {
  return (
    <ContainerPage>
      <Sidebar />
      <PageContent>
        <h1>Carteira de Clientes</h1>
        <DropDown />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <SectionCustomer />
          <SectionAssistant />
        </div>
      </PageContent>
    </ContainerPage>
  );
};

export default HomePage;
