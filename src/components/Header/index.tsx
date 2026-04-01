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
    label: <Link to={"/oferta"}>Oferta</Link>,
    
  },
  {
    key: "3",
    label: <Link to={"/coleta"}>Coleta</Link>,
  },
];

export function Header() {
  return (
    <Container>
      <Content>
        <Tabs
          defaultActiveKey="2"
          items={screens}
          type="line"
          size="large"
          centered={true}
          color="#000"
        />
      </Content>
    </Container>
  );
}
