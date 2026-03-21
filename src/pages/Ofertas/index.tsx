import React, { MouseEvent } from "react";
import { Container } from "./styles";
import { DizimoTable } from "../../components/Dashboard";

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
      <DizimoTable/>
      
    </Container>
  );
}
