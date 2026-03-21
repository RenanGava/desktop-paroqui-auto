import React, { Key } from "react";
import {
  Dropdown,
  MenuProps,
  Button,
  Flex,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { List, PencilLine, SendHorizonal, Trash } from "lucide-react";
import { useDizimo } from "../../hooks/useDizimo";
import dayjs from "dayjs";

interface DizimoTableProps {
  dizimos: IListDizimo[];
}

export function DizimoTable({ dizimos }: DizimoTableProps) {
  const { submitDizimo } = useDizimo();
  const { Column } = Table;

  return (
    <>
      <Table<IListDizimo> dataSource={dizimos}>
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
              <Tooltip title="Editar">
                <Button color="green" variant="solid" size="small">
                  <PencilLine color="#000" size={16} />
                </Button>
              </Tooltip>

              <Tooltip title="Deletar">
                <Button color="danger" variant="solid" size="small">
                  <Trash color="#000" size={16} />
                </Button>
              </Tooltip>

              <Tooltip title="Enviar">
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
