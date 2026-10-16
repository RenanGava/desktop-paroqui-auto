import { Card, Steps, Flex, Spin, Divider, Space } from "antd";
import React, { useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { useConfigComunidadesApp } from "../../hooks/useConfigApp/useConfigComunidades";

export function Comunidades() {
  const {
    amount,
    handleSyncComunidadesDB,
    handleSyncAllComunidadesDB,
    qtdComunidadesParoquiAuto,
    isLoading,
  } = useConfigComunidadesApp();

  const [current, setCurrent] = useState(0)

  return (
    <Space orientation="vertical"
      align="center"
      style={{
        width: "100%",

      }}
    >
      <Card
        style={{
          width: 600,
          margin: "0 auto"
        }}
        hoverable

      >
        <Flex
          align="center"
          justify="space-around"

        >
          <Card.Meta
            description={`Comunidades Theos ${amount}`}
          />
          <Divider orientation="vertical" />
          <Card.Meta
            description={`Comunidades no ParoquiAuto ${qtdComunidadesParoquiAuto}`}
          />
        </Flex>
      </Card>
      <Card
        style={{
          width: 600,
          margin: "0 auto",
        }}
        hoverable

      >
        <Flex
          align="center"
          justify="space-around"
        >
          <Card.Meta
            description={`Comunidades Theos ${amount}`}
          />
          <Card.Meta
            description={`Comunidades no ParoquiAuto ${qtdComunidadesParoquiAuto}`}
          />
        </Flex>
      </Card>
    </Space>
  );
}



//<Spin indicator={<LoadingOutlined spin />} size="small" />