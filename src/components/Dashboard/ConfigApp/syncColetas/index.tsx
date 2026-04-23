import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { useConfigColetaApp } from "../../../../hooks/useConfigApp/useConfigColeta";

export function SyncColetas() {
  const {
    amount,
    handleSyncColetasDB,
    handleSyncAllColetasDB,
    qtdColetasParoquiAuto,
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
      <Card.Meta description={`Coletas não sincronizadas do Theos ${amount}`} />
      <Card.Meta
        description={`Itens Cadastrados no App ${qtdColetasParoquiAuto}`}
      />
    </Card>
  );
}
