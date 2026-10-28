import { Card, Listy } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { useConfigFieisApp } from "../../hooks/useConfigApp/useConfigFieis";
import { useConfig } from "../../context/Config";

export function ConfigFieis() {
  const {  } = useConfigFieisApp();
  const { qtdFieisNotregister } = useConfig()
  

  return (
    <Card>
     {/* <Listy/> */}
    </Card>
  );
}
