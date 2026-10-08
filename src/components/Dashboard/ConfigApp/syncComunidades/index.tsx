import { Card } from "antd";
import React from "react";
import { useConfigComunidadesApp } from "../../../../hooks/useConfigApp/useConfigComunidades";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export function SyncComunidades() {
  const {
    amount,
    handleSyncComunidadesDB,
    handleSyncAllComunidadesDB,
    qtdComunidadesParoquiAuto,
    isLoading,
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
      {isLoading ? (
        <Spin indicator={<LoadingOutlined spin />} size="small" />
      ) : (
        <>
          <Card.Meta
            description={`Comunidades não sincronizadas do Theos ${amount}`}
          />
          <Card.Meta
            description={`Comunidades no sistema ${qtdComunidadesParoquiAuto}`}
          />
        </>
      )}
    </Card>
  );
}
