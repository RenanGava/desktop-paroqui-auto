import React, { Key, useState } from "react";
import { Button, Flex, Modal, Table, Tooltip, Popconfirm } from "antd";
import { List, PencilLine, SendHorizonal, Trash } from "lucide-react";
import dayjs from "dayjs";

interface OfertaTableProps {
  coletas: IListColeta[];
  submit: (oferta: IListColeta) => Promise<void>
  edit: (oferta: IListColeta) => void
  deleteFn: (id: string) => Promise<void>
  
}

export function ColetaTable({
  coletas,
  edit,
  submit,
  deleteFn
}: OfertaTableProps) {
  const { Column } = Table;

  return (
    <>
      <Table<IListColeta> dataSource={coletas} rowKey="id" >
        <Column title="ID" dataIndex="id" key="id" width={80} />
        <Column
          title="Comunidade"
          dataIndex={["comunidade", "nome"]}
          key="comunidade"
          width={200}
        />
        <Column
          title="Comunidade"
          dataIndex={["tipo_coleta", "tipo"]}
          key="comunidade"
          width={200}
        />
        <Column
          title="Data Lancamento"
          dataIndex="data_lancamento"
          key="data_lancamento"
          width={140}
          render={(value) => {
            return dayjs(value).format("DD/MM/YYYY");
          }}
        />
        <Column
          title="Valor"
          dataIndex="valor"
          key="valor"
          width={120}
          render={(value) => {
            return (parseInt(value) / 100).toString().replace(".", ",");
          }}
        />
        <Column
          title="Funções"
          key="action"
          width={120}
          render={(_: any, coleta: IListColeta) => (
            <Flex gap={"small"} justify="center">
              <Tooltip title="Editar" key={"edit"}>
                <Button
                  color="green"
                  variant="solid"
                  size="small"
                  onClick={() => {
                    edit(coleta)
                  }}
                >
                  <PencilLine color="#000" size={16} />
                </Button>
              </Tooltip>

              <Tooltip title="Deletar" key={"del"}>
                <Popconfirm
                  title="Deletar esta oferta?"
                  okText="Sim"
                  okType="danger"
                  onConfirm={async () =>{
                    await deleteFn(coleta.documentId)
                  }}
                  cancelText="Não"
                >
                  <Button
                    color="danger"
                    variant="solid"
                    size="small"
                  >
                    <Trash color="#000" size={16} />
                  </Button>
                </Popconfirm>
              </Tooltip>

              <Tooltip title="Enviar" key={"enviar"}>
                <Button
                  color="blue"
                  variant="solid"
                  size="small"
                  onClick={async () => {
                    await submit(coleta)
                  }}
                >
                  <SendHorizonal color="#000" size={16} />
                </Button>
              </Tooltip>
            </Flex>
          )}
        />
      </Table>
    </>
  );
}
