import { Card } from "antd";
import React from "react";
import { useConfigComunidadesApp } from "../../../../hooks/useConfigApp/useConfigComunidades";

export function SyncComunidades() {
  const {
    amount,
    handleSyncComunidadesDB,
    handleSyncAllComunidadesDB,
    qtdComunidadesParoquiAuto,
  } = useConfigComunidadesApp();

  return (
    <Card
      title="Sincronizar Comunidades"
      style={{ width: 300 }}
      hoverable
      onClick={async (e) => {
        qtdComunidadesParoquiAuto < 1 && (await handleSyncAllComunidadesDB());
        qtdComunidadesParoquiAuto >= 1 && (await handleSyncComunidadesDB());
      }}
    >
      <Card.Meta description={`Coletas não sincronizadas do Theos ${amount}`} />
      <Card.Meta
        description={`Itens Cadastrados no App ${qtdComunidadesParoquiAuto}`}
      />
    </Card>
  );
}
