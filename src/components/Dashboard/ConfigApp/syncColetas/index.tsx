import React, { useEffect, useState } from "react";
import { Card, Button, Spin } from "antd";
import { useConfigColetaApp } from "../../../../hooks/useConfigApp/useConfigColeta";
import { LoadingOutlined } from "@ant-design/icons";

export function SyncColetas() {
  const {
    amount,
    handleSyncColetasDB,
    handleSyncAllColetasDB,
    qtdColetasParoquiAuto,
    isLoading
  } = useConfigColetaApp();

  return (
    <Card
      title="Sincronizar Coletas"
      style={{ width: 300 }}
      hoverable
      onClick={async (e) => {
        qtdColetasParoquiAuto < 1 && (await handleSyncAllColetasDB());
        qtdColetasParoquiAuto >= 1 && (await handleSyncColetasDB());
      }}
    >
      {!isLoading ? (
        <>
          <Card.Meta description={`Coletas não sincronizadas do Theos ${amount}`} />
          <Card.Meta
            description={`Itens Cadastrados no App ${qtdColetasParoquiAuto}`}
          />
        </>
      ) : <Spin indicator={<LoadingOutlined spin />} size="small" />}
      
    </Card>
  );
}
