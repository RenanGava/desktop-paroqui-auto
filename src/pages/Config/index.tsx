import React from "react";
import { Card, Col, Row, Flex } from "antd";
import { SyncColetas } from "../../components/Dashboard/ConfigApp/syncColetas";
import { SyncComunidades } from "../../components/Dashboard/ConfigApp/syncComunidades";
import { SyncFieis } from "../../components/Dashboard/ConfigApp/syncFieis";

export function TiposConfig() {

  return (
    <Flex justify="center" gap={10} wrap>
      {/* <SyncColetas />
      <SyncComunidades/> */}
      <SyncFieis/>
    </Flex>
  );
}
