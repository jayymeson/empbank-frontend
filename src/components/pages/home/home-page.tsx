import React from "react";
import Sidebar from "../../organisms/sidebar/sidebar";
import LinkButtonComponent from "../../atoms/button/LinkButtonComponent";
import AddButtonComponent from "../../atoms/button/AddButtonComponent";
import RoundButtonComponent from "../../atoms/button/RoundButtonComponent";
import UnlinkButtonComponent from "../../atoms/button/UnlinkButtonComponent";

const HomePage = () => {

  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <LinkButtonComponent onClick={handleClick}/>
      <AddButtonComponent onClick={handleClick} />
      <RoundButtonComponent onClick={handleClick}/>
      <UnlinkButtonComponent onClick={handleClick}/>
    </div>
  );
};

export default HomePage;
