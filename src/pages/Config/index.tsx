import React from "react";
import { Card, Col, Row, Flex } from "antd";
import { SyncColetas } from "../../components/Dashboard/ConfigApp/syncColetas";
import { SyncComunidades } from "../../components/Dashboard/ConfigApp/syncComunidades";
import { SyncFieis } from "../../components/Dashboard/ConfigApp/syncFieis";
import { useConfigComunidadesApp } from "../../hooks/useConfigApp/useConfigComunidades";

export function TiposConfig() {
  const { qtdComunidadesParoquiAuto } = useConfigComunidadesApp()

  

  return (
    <Flex justify="center" gap={10} wrap>
      {/* <SyncColetas /> */}
      {/* <SyncComunidades/>
      {qtdComunidadesParoquiAuto > 1 && <SyncFieis/>} */}
    </Flex>
  );
}
