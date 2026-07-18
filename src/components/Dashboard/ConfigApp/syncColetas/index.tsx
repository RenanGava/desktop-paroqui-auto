import React, { CSSProperties, useEffect, useState } from "react";
import { Card, Button, Table, Switch, Flex, Tooltip, Popconfirm } from "antd";
import { useConfigColetaApp } from "../../../../hooks/useConfigApp/useConfigColeta";
import { Container, Content, Icon, Title } from "./styles";
import Column from "antd/es/table/Column";
import { PencilLine, SendHorizonal, Trash } from "lucide-react"
import { Oval } from "react-loader-spinner";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export function SyncColetas() {
  const { coletasTheos, coletasStrapi, handleSubmitColeta, isLoading } = useConfigColetaApp();


  return (
    <Container>

      <h5>Tipos Sincronizados</h5>
      <Content>
        <Table<IColetas>
          dataSource={coletasTheos}
          rowKey={'id'}
          style={{ width: 560 }}
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

          <Column
            title="Sincronizar"
            key="action"
            width={120}
            render={(_: any, coleta: IColetas) => (
              <Flex gap={"small"} justify="center">
                <Tooltip title="Sincronizar?" key={"sync"}>
                  <Popconfirm
                    title="Deseja Sincronizar?"
                    okText="Sim"
                    okType="danger"
                    onConfirm={async () => {
                      handleSubmitColeta(coleta)

                    }}
                    cancelText="Não"
                  >
                    <Button
                      color="blue"
                      variant="solid"
                      size="small"
                    >
                      {!isLoading && <SendHorizonal color="#000" size={16} />}
                      <Oval
                        visible={isLoading}
                        height="20"
                        width="20"
                        color="#000"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </Button>
                   
                  </Popconfirm>
                </Tooltip>
              </Flex>
            )}
          />
        </Table>
        <Table<ITiposColetas>
          dataSource={coletasStrapi}
          rowKey={'id'}
          style={{ width: 560 }}
        >
          <Column
            title="ID"
            dataIndex={'id'}
            key="comunidade"

          />
          <Column
            title="Tipo Coleta ParoquiAuto"
            dataIndex={'tipo'}
            key="tipo"

          />
          <Column
            title="Ativado"
            key="action"
            width={120}
            render={(_: any, coleta: ITiposColetas) => (
              <Flex gap={"small"} justify="center">
                <Tooltip title="Editar" key={"edit"}>
                  <Button
                    color="green"
                    variant="solid"
                    size="small"
                    onClick={() => {
                      console.log(coleta);

                    }}
                  >
                    <PencilLine color="#000" size={16} />
                  </Button>
                </Tooltip>

                <Switch checked={coleta.ativo} />

                <Tooltip title="Enviar" key={"enviar"}>
                  <Button
                    color="blue"
                    variant="solid"
                    size="small"
                    onClick={async () => {
                      console.log('Caiu 2');

                    }}
                  >
                    <SendHorizonal color="#000" size={16} />
                  </Button>
                </Tooltip>
              </Flex>
            )}
          />
        </Table>
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