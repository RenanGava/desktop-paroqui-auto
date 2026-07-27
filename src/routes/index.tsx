import {
  Route,
  Routes,
  HashRouter,
} from "react-router";
import React, { useEffect } from "react";
import { DizimoDash } from "../pages/Dizimo";
import { OfertaDash } from "../pages/Ofertas";
import { ColetaDash } from '../pages/Coletas'
import { Header } from "../components/Header";
import { TiposConfig } from "../pages/Config";
import { FieisDash } from "../pages/Fieis";
import { SyncColetas } from "../components/Dashboard/ConfigApp/syncColetas";

// eslint-disable-next-line import/no-unresolved


export function MainRouter() {

  useEffect(() => {
    console.log();
  }, [window.navigation.currentEntry?.url])
  
  return (
    <HashRouter>
      <Header/>
      <Routes >
        <Route element={<DizimoDash />} path="/" />
        <Route element={<ColetaDash />} path="/coleta"/>
        <Route element={<OfertaDash />} path="/oferta" />
        <Route element={<TiposConfig />} path="/config" />
        <Route element={<FieisDash />} path="/fieis" />
        <Route element={<SyncColetas />} path="/syncColetas" />
      </Routes>
    </HashRouter>
  );
}
