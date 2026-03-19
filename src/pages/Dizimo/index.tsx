import React from "react";
import { Container } from "./styles";
import { DizimoTable } from "../../components/Dashboard/Main";

export function DizimoDash() {
  async function handleClick() {
  
    return
  }

  return (
    <Container>
      <header>
        <h1 onClick={ () => handleClick()}>Lista Do Dizimo</h1>
      </header>
      <DizimoTable/>
      
    </Container>
  );
}
