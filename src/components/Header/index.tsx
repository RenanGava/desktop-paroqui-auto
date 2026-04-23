import React, { useEffect } from "react";
import { Container, Content } from "./style";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Link, useLocation } from "react-router";

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
  {
    key: "4",
    label: <Link to={"/config"}>Config App</Link>,
  },
];

export function Header() {

  const location = useLocation()

  useEffect(() =>{
    console.log(location.pathname);
    
  }, [location])
  return (
    <Container>
      <Content>
        <Tabs
          defaultActiveKey="3"
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
