import {
  Route,
  Routes,
  HashRouter,
  Link,
} from "react-router";
import React from "react";
import { Dash } from "../pages/Dizimo";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

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
      <Tabs
        defaultActiveKey="1"
        items={screens}
      />

      <Routes>
        <Route element={<Dash />} path="/" index={true} />
      </Routes>
    </HashRouter>
  );
}
