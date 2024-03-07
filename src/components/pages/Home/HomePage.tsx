import React, { useEffect, useState } from "react";
import Sidebar from "../../organisms/Sidebar/Sidebar";
import SectionCustomer from "../../organisms/SectionCustomers/SectionCustomers";
import DropDown from "../../molecules/DropDown/DropDown";
import { ContainerPage, PageContent } from "./styled";

const HomePage = () => {
  return (
    <ContainerPage>
      <Sidebar />
      <PageContent>
        <h1>Carteira de Clientes</h1>
        <DropDown />
        <SectionCustomer />
      </PageContent>
    </ContainerPage>
  );
};

export default HomePage;
