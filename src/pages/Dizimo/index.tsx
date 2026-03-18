import React from "react";
import { Container } from "./styles";
import { DashMainData } from "../../components/Dashboard/Main";

export function DizimoDash() {
  async function handleClick() {
    
    // window.api.loginTheos();
    console.log(await window.api.loginTheos());
    
  }

  return (
    <Container>
      <header>
        <h1 onClick={ () => handleClick()}>Lista Do Dizimo</h1>
      </header>
      <DashMainData/>
      
    </Container>
  );
}
