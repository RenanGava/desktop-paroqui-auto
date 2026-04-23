import { Card } from "antd";
import React from "react";
import { useConfigComunidadesApp } from "../../../../hooks/useConfigApp/useConfigComunidades";
import { useConfigFieisApp } from "../../../../hooks/useConfigApp/useConfigFieis";

export function SyncFieis() {
  const {
    amount,
    fieisUnSync,
    qtdFieisParoquiAuto,
    handleSyncAllFieisDB,
    handleSyncFieisDB
  } = useConfigFieisApp();

  return (
    <Card
      title="Sincronizar Comunidades"
      style={{ width: 300 }}
      hoverable
      onClick={async (e) => {
        qtdFieisParoquiAuto < 1 && (await handleSyncAllFieisDB());
        qtdFieisParoquiAuto >= 1 && (await handleSyncFieisDB());
      }}
    >
      <Card.Meta description={`Coletas não sincronizadas do Theos ${amount}`} />
      <Card.Meta
        description={`Itens Cadastrados no App ${qtdFieisParoquiAuto}`}
      />
    </Card>
  );
}
