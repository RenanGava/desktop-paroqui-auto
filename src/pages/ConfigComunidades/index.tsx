import { Card } from "antd";
import React from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useConfigComunidadesApp } from "../../hooks/useConfigApp/useConfigComunidades";
import { useNavigate } from 'react-router'

export function Comunidades() {
  const {
    amount,
    syncCommunities,
    qtdComunidadesParoquiAuto,
    isLoading,
  } = useConfigComunidadesApp();

  const navigate = useNavigate()

  return (
    <Card
      title="Sincronizar Comunidades"
      style={{ width: 300 }}
      hoverable
      onClick={async (e) =>{await syncCommunities() }}
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
