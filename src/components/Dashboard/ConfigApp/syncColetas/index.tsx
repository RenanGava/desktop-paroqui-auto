import React, {  } from "react";
import { Button, Table, Switch, Flex, Tooltip, Popconfirm } from "antd";
import { useConfigColetaApp } from "../../../../hooks/useConfigApp/useConfigColeta";
import { Container, Content } from "./styles";
import Column from "antd/es/table/Column";
import { PencilLine, SendHorizonal, Trash } from "lucide-react"
import { Oval } from "react-loader-spinner";



export function SyncColetas() {
  const {
    coletasTheos,
    coletasStrapi,
    handleSubmitColeta,
    isLoading,
    handleToggleStatus
  } = useConfigColetaApp();


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
                <Tooltip title="Deletar" key={"del"}>
                  <Button
                    color="red"
                    variant="solid"
                    size="small"
                    onClick={() => {
                      console.log(coleta);

                    }}
                  >
                    <Trash color="#000" size={16} />
                  </Button>
                </Tooltip>

                <Switch checked={coleta.ativo}  onChange={(e) => { 
                  handleToggleStatus(coleta.documentId!, e)
                
                }}/>

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