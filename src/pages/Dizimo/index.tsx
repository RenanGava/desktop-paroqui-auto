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
    deleteDizimo
  } = useDizimo();
  const format = "DD/MM/YYYY";

  const navigate = useNavigate();

  function handleOpenAndSetDizimoEdit(dizimo: IListDizimo) {
    setDizimoForEdit(dizimo);
    setOpen(true);
  }

  function formatedValueForDecimal(value: string) {
    const turnIntoDecimal = Number.parseFloat(value) / 100;

    if (turnIntoDecimal > 0) {
      // setFormatedDizimo(turnIntoDecimal);
      const formated = turnIntoDecimal.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formated;
    } else {
      return "0";
    }
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
                initDate: date.format("YYYY-MM-DD"),
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
                lastdate: date.format("YYYY-MM-DD"),
              });
            }}
          />
          <Button
            type="primary"
            onClick={() => getDizimos(selectDate.initDate, selectDate.lastdate)}
          >
            Buscar
          </Button>
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
          setOpen(false)
          await editDizimo(dizimoForEdit)
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
                setDizimoForEdit((prev) => ({
                  ...prev,
                  fiel: {
                    ...prev.fiel,
                    nome: e.target.value,
                  },
                }));
              }}
            />
          </Flex>
          <Flex orientation="vertical" gap={0}>
            <Typography.Title level={5}>Valor</Typography.Title>
            <Input
              placeholder="Nome"
              value={formatedValueForDecimal(dizimoForEdit?.valor)}
              onChange={(e) => {
                setDizimoForEdit((prev) => ({
                  ...prev,
                  valor: e.target.value.replace(/\D/g, ""),
                }));
              }}
            />
          </Flex>
        </Flex>
      </Modal>
      {contextHolder}
    </Container>
  );
}
