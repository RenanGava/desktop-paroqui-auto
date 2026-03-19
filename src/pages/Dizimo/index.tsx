import React, { useState, Key } from "react";
import { Container } from "./styles";
import { DizimoTable } from "../../components/Dashboard/Main";
import { useNavigate } from 'react-router'
import { Button, Flex, Modal, Space, Table, Tag } from 'antd'
import { useDizimo } from "../../hooks/useDizimo";
import dayjs from "dayjs";


const { Column, ColumnGroup } = Table
interface IListDizimo {
  id: Key;
  valor: string;
  documentId: string;
  data_lancamento: string;
  comunidade: {
    id: number;
    documentId: string;
    nome: string;
  };
  fiel: {
    id: number;
    documentId: string;
    nome: string;
    dizimistaId: string
  }

}



export function DizimoDash() {

  const [IsModalOpen, setIsMOdalOpen] = useState(false)
  const { listDizimo } = useDizimo()

  const navigate = useNavigate()


  return (
    <Container>
      <header>

      </header>
      {/* <DizimoTable/> */}
      <Table<IListDizimo> dataSource={listDizimo}>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title="Nome" dataIndex={['fiel', 'nome']} key="nome" />
        <Column title="Data Lancamento" dataIndex="data_lancamento" key="data_lancamento" 
            render={(value, data, index) => {
              return dayjs(value).format('DD/MM/YYYY')
            }}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, fiel: IListDizimo) => (
            <Space size="medium">
              <a>Invite {fiel.fiel.nome}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </Container>
  );
}
