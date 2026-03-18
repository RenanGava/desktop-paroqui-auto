import React, { MouseEvent } from "react";
import { Container } from "./styles";
import { DashMainData } from "../../components/Dashboard/Main";

export function OfertaDash() {
  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    window.api.loginTheos();
  }

  return (
    <Container>
      <header>
        <h1>Lista Da Oferta</h1>
      </header>
      <DashMainData/>
      
    </Container>
  );
}
