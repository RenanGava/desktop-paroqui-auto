import React from "react";
import { Container, Content } from "./style";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Link } from "react-router";

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
  {
    key: "3",
    label: <Link to={"/coleta"}>coleta</Link>,
  },
];

export function Header() {
  return (
    <Container>
      <Content>
        <Tabs defaultActiveKey="1" items={screens} type="card" size="large" />
      </Content>
    </Container>
  );
}
