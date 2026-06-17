import React, { Key, useState } from "react";
import { Button, Flex, Modal, Table, Tooltip, Popconfirm } from "antd";
import { List, PencilLine, SendHorizonal, Trash } from "lucide-react";
import dayjs from "dayjs";

interface FieisTableProps {
  fieis: any[];
  submitDizimo: (dizimo: IListDizimo) => Promise<void>;
  setIsOpen(dizimo: IListDizimo): void;
  deleteDizimo(id: string): Promise<void>;
  selectedPage: number, 
  setSelectedPage: (page: number) => void
  pages: number
  
}

export function FieisTable({
  fieis,
  selectedPage,
  pages, 
  submitDizimo,
  setIsOpen,
  setSelectedPage,
  deleteDizimo
}: FieisTableProps) {
  const { Column } = Table;

  return (
    <>
      <Table<IListDizimo> dataSource={fieis} rowKey="id" pagination={{
        async onChange(page, pageSise){
          setSelectedPage(page)
        },
        total: pages,
        current: selectedPage
        
      }}>
        <Column title="ID" dataIndex="id" key="id" width={80} />
        <Column
          title="Nome"
          dataIndex={"nome"}
          key="nome"
          width={200}
        />
        <Column
          title="CPF"
          width={120}
          dataIndex={"cpf"}
          key="dizimistaId"
        />
        <Column
          title="Sexo"
          width={120}
          dataIndex={"sexo"}
          key="dizimistaId"
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
