import {
  Route,
  Routes,
  HashRouter,
} from "react-router";
import React from "react";
import { DizimoDash } from "../pages/Dizimo";
import { OfertaDash } from "../pages/Ofertas";
import { Header } from "../components/Header";

// eslint-disable-next-line import/no-unresolved


export function MainRouter() {
  return (
    <HashRouter>
      <Header/>
      <Routes>
        <Route element={<DizimoDash />} path="/"  />
        <Route element={<OfertaDash />} path="/oferta" index={true} />
      </Routes>
    </HashRouter>
  );
}
