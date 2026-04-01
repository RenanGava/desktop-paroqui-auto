import React, { Key, useState } from "react";
import { Button, Flex, Modal, Table, Tooltip, Popconfirm } from "antd";
import { List, PencilLine, SendHorizonal, Trash } from "lucide-react";
import dayjs from "dayjs";

interface DizimoTableProps {
  dizimos: IListDizimo[];
  submitDizimo: (dizimo: IListDizimo) => Promise<void>;
  setIsOpen(dizimo: IListDizimo): void;
  deleteDizimo(id: string): Promise<void>;
}

export function DizimoTable({
  dizimos,
  submitDizimo,
  setIsOpen,
  deleteDizimo,
}: DizimoTableProps) {
  const { Column } = Table;

  return (
    <>
      <Table<IListDizimo> dataSource={dizimos} rowKey="id">
        <Column title="ID" dataIndex="id" key="id" width={80} />
        <Column
          title="Nome"
          dataIndex={["fiel", "nome"]}
          key="nome"
          width={200}
        />
        <Column
          title="Cod. Dizimo"
          width={120}
          dataIndex={["fiel", "dizimistaId"]}
          key="dizimistaId"
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
          render={(_: any, dizimo: IListDizimo) => (
            <Flex gap={"small"} justify="center">
              <Tooltip title="Editar" key={"edit"}>
                <Button
                  color="green"
                  variant="solid"
                  size="small"
                  onClick={() => {
                    setIsOpen({ ...dizimo });
                  }}
                >
                  <PencilLine color="#000" size={16} />
                </Button>
              </Tooltip>

              <Tooltip title="Deletar" key={"del"}>
                <Popconfirm
                  title="Deletar este Dízimo?"
                  okText="Sim"
                  okType="danger"
                  onConfirm={() =>{
                    deleteDizimo(dizimo.documentId);
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
                  onClick={() => submitDizimo(dizimo)}
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
