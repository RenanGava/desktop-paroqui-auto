import {
  Route,
  Routes,
  HashRouter,
  Link,
} from "react-router";
import React from "react";
import { DizimoDash } from "../pages/Dizimo";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { OfertaDash } from "../pages/Ofertas";
import { Header } from "../components/Header";

// eslint-disable-next-line import/no-unresolved

const screens: TabsProps["items"] = [
  {
    key: "1",
    label: <Link to={"/"}>Dizimo</Link>,
  },
  {
    key: "2",
    label: <Link to={"/oferta"}>oferta</Link>,
  },
];

export function MainRouter() {
  return (
    <HashRouter>
      <Header/>
      <Routes>
        <Route element={<DizimoDash />} path="/" index={true} />
        <Route element={<OfertaDash />} path="/oferta" index={true} />
      </Routes>
    </HashRouter>
  );
}
