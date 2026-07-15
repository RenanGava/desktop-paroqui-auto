import React, { useEffect, useState } from "react";
import { Card, Button, Table, Space } from "antd";
import { useConfigColetaApp } from "../../../../hooks/useConfigApp/useConfigColeta";
import { Container, Content, Title } from "./styles";
import Column from "antd/es/table/Column";


export function SyncColetas() {
  const {coletasTheos, coletasStrapi, columns } = useConfigColetaApp();

  return (
    <Container>

      <h5>Tipos Sincronizados</h5>
      <Content>
        <Table<IColetas>
          dataSource={coletasTheos}
          rowKey={'id'}
        >
          <Column
          title="ID"
          dataIndex={'id'}
          key="comunidade"
          
        />
        <Column
          title="Tipo Coleta Theos"
          dataIndex={'descricao'}
          key="descricao"
          
        />
        </Table>
        <Table<IColetas>
          dataSource={coletasStrapi}
          rowKey={'id'}
          style={{height: 400}}
        >
          <Column
          title="ID"
          dataIndex={'id'}
          key="comunidade"
          
        />
        <Column
          title="Tipo Coleta ParoquiAuto"
          dataIndex={'descricao'}
          key="descricao"
          
        /></Table>
      </Content>
    </Container>
  );
}


{/* <Card
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
</Card> */}