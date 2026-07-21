import React, { Key, useState } from "react";
import { Button, Flex, Modal, Table, Tooltip, Popconfirm } from "antd";
import { List, PencilLine, SendHorizonal, Trash } from "lucide-react";
import dayjs from "dayjs";

interface FieisTableProps {
  fieis: FielProps[];
  submitFiel: (dizimo: FielProps) => Promise<void>;
  setIsOpen(dizimo: FielProps): void;
  deleteFiel(id: string): Promise<void>;
  selectedPage: number, 
  setSelectedPage: (page: number) => void
  pages: number
  getData: (...data: any) => Promise<void>
  selectedComunyti: IListComunidades
  
}

export function FieisTable({
  fieis,
  selectedPage,
  pages, 
  submitFiel,
  setIsOpen,
  setSelectedPage,
  deleteFiel,
  getData,
  selectedComunyti
}: FieisTableProps) {
  const { Column } = Table;

  return (
    <>
      <Table<FielProps> dataSource={fieis} rowKey="id" pagination={{
        async onChange(page, pageSise){
          setSelectedPage(page)
          await getData(page, selectedComunyti)
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
          title="Comunidade"
          width={140}
          dataIndex={["comunidade", "nome"]}
          key="nome"
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
          render={(_: any, fiel: FielProps) => (
            <Flex gap={"small"} justify="center">
              <Tooltip title="Editar" key={"edit"}>
                <Button
                  color="green"
                  variant="solid"
                  size="small"
                  onClick={() => {
                    setIsOpen({ ...fiel });
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
                    deleteFiel(fiel.documentId);
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
                  onClick={() => {
                    submitFiel(fiel)
                    console.log(fiel);
                    
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
