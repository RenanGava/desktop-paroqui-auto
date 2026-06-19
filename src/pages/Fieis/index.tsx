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
import { useFieis } from "../../hooks/useFieis";
import { FieisTable } from "../../components/Dashboard/Fieis";
dayjs.extend(UTC);

const { Column, ColumnGroup } = Table;

export function FieisDash() {
  const [open, setOpen] = useState(false);

  const {
    selectDate,
    dizimoForEdit,
    getDizimos,
    setSelectDate,
    submitDizimo,
    editDizimo,
    setDizimoForEdit,
  } = useDizimo();

  const { fieis, selectedPage, setSelectedPage, pages, deleteFiel, submitFiel, contextHolder} = useFieis()
  const format = "DD/MM/YYYY";

  const navigate = useNavigate();

  function handleOpenAndSetFielEdit(dizimo: FielProps) {
    // setDizimoForEdit(dizimo);
    console.log('caiu aqui', dizimo)

    setOpen(true);
  }

  function handleChangeName(name: string) {
    setDizimoForEdit(prevState => {


      return prevState ? {
        ...prevState,
        fiel: {
          ...prevState.fiel,
          nome: name,
        }
      } : null
    })
  }

  function handleChangeValue(value: string) {
    setDizimoForEdit(prevState => {
      return prevState ? {
        ...prevState,
        valor: value
      } : null
    })
  }

  return (
    <Container>
      
      <FieisTable
        fieis={[...fieis]}
        submitFiel={submitFiel}
        setIsOpen={handleOpenAndSetFielEdit}
        deleteFiel={deleteFiel}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        pages={pages}
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
                handleChangeName(e.target.value)
              }}
            />
          </Flex>
          <Flex orientation="vertical" gap={0}>
            <Typography.Title level={5}>Valor</Typography.Title>
            <Input
              placeholder="Valor"
              key={"valor"}
              value={formatedValueForDecimal(dizimoForEdit?.valor)}
              type={'number'}
              onChange={(e) => {
                e.preventDefault()
                handleChangeValue(e.target.value)
              }}
            />
          </Flex>
        </Flex>
      </Modal>
      {contextHolder}
    </Container>
  );
}
