import { Card } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { useConfigFieisApp } from "../../hooks/useConfigApp/useConfigFieis";

export function ConfigFieis() {
  const { amount, qtdFieisParoquiAuto, handleSyncFieisDB, isLoading } =
    useConfigFieisApp();

  return (
    <Card
      title="Sincronizar Fieis"
      style={{ width: 300 }}
      hoverable
      
      onClick={async (e) => {
        await handleSyncFieisDB();
      }}
    >
      {isLoading && <Spin indicator={<LoadingOutlined spin />} size="small" />}
      {!isLoading && (
        <>
          <Card.Meta
            description={`Fieis não sincronizadoss do Theos ${amount}`}
          />
          <Card.Meta
            description={`Itens Cadastrados no App ${qtdFieisParoquiAuto}`}
          />
        </>
      )}
    </Card>
  );
}
