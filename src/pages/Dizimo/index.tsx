import React, { MouseEvent } from "react";
import { Container } from "./styles";
import { DashMainData } from "../../components/Dashboard/Main";

export function Dash() {
  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    window.api.loginTheos();
  }

  return (
    <Container>
      <header>
        <h1>Lista Do Dizimo</h1>
      </header>
      <DashMainData/>
      
    </Container>
  );
}
