import React, { useState, Key } from "react";
import { Container } from "./styles";
import { DizimoTable } from "../../components/Dashboard/Dizimo";
import { useNavigate } from "react-router";
import {
  Button,
  Flex,
  Table,
  DatePicker,
  Modal,
  Input,
  Typography,
  InputNumber,
} from "antd";
import { useDizimo } from "../../hooks/useDizimo";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import { User } from "lucide-react";
import { formatedValueForDecimal } from "../../utils/formatedValue";
dayjs.extend(UTC);

const { Column, ColumnGroup } = Table;

export function DizimoDash() {
  const [open, setOpen] = useState(false);

  const {
    listDizimo,
    selectDate,
    dizimoForEdit,
    contextHolder,
    getDizimos,
    setSelectDate,
    submitDizimo,
    editDizimo,
    setDizimoForEdit,
    deleteDizimo,
  } = useDizimo();
  const format = "DD/MM/YYYY";

  const navigate = useNavigate();

  function handleOpenAndSetDizimoEdit(dizimo: IListDizimo) {
    setDizimoForEdit(dizimo);
    setOpen(true);
  }

  return (
    <Container>
      <header>
        <Flex gap="small" align="center">
          <DatePicker
            defaultValue={dayjs().startOf("month")}
            format={format}
            onChange={(date) => {
              console.log();
              setSelectDate({
                ...selectDate,
                initDate: dayjs(date).format("YYYY-MM-DD"),
              });
            }}
          />
          <span>-</span>
          <DatePicker
            defaultValue={dayjs().endOf("month")}
            format={"DD/MM/YYYY"}
            onChange={(date) => {
              console.log();
              setSelectDate({
                ...selectDate,
                lastdate: dayjs(date).format("YYYY-MM-DD"),
              });
            }}
          />
          <Button
            type="primary"
            onClick={() => getDizimos(selectDate.initDate, selectDate.lastdate)}
          >
            Buscar
          </Button>
          <Typography.Text>{window.env.API_URL}</Typography.Text>
        </Flex>
      </header>
      <DizimoTable
        dizimos={[...listDizimo]}
        submitDizimo={submitDizimo}
        setIsOpen={handleOpenAndSetDizimoEdit}
        deleteDizimo={deleteDizimo}
      />

      <Modal
        title="Editar Dizimo"
        open={open}
        onOk={async () => {
          setOpen(false);
          await editDizimo(dizimoForEdit);
        }}
        onCancel={() => {
          setOpen(false);
          setDizimoForEdit(null);
        }}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Flex orientation="vertical" gap={5}>
          <Flex orientation="vertical">
            <Typography.Title level={5}>Nome</Typography.Title>
            <Input
              placeholder="Nome"
              value={dizimoForEdit?.fiel.nome}
              key={"nome"}
              onChange={(e) => {
                e.preventDefault();
                setDizimoForEdit((prev) =>
                  prev
                    ? {
                        ...prev,
                        fiel: {
                          ...prev.fiel,
                          nome: e.target.value,
                        },
                      }
                    : null,
                );
              }}
            />
          </Flex>
          <Flex orientation="vertical" gap={0}>
            <Typography.Title level={5}>Valor</Typography.Title>
            <Input
              placeholder="Nome"
              value={formatedValueForDecimal(dizimoForEdit?.valor)}
              onChange={(e) => {
                setDizimoForEdit((prev) =>
                  prev
                    ? {
                        ...prev,
                        fiel: {
                          ...prev.fiel,
                          nome: e.target.value,
                        },
                      }
                    : null,
                );
              }}
            />
          </Flex>
        </Flex>
      </Modal>
      {contextHolder}
    </Container>
  );
}
