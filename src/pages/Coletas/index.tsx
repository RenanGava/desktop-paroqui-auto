import React, { MouseEvent, useState } from "react";
import { Container, Content } from "./styles";
import { OfertaTable } from "../../components/Dashboard/Coleta";
import { Button, DatePicker, Flex, Input, Modal, Typography } from "antd";
import dayjs from "dayjs";
import { useColeta } from "../../hooks/useColeta";
import { useNavigate } from "react-router";

export function ColetaDash() {
  const [open, setOpen] = useState(false);

  const {
    coletaForEdit,
    contextHolder,
    deleteColeta,
    editColeta,
    getColetas,
    listColeta,
    selectDate,
    setColetaForEdit,
    setSelectDate,
    submitOferta
  } = useColeta();
  const format = "DD/MM/YYYY";

  const navigate = useNavigate();

  function handleOpenAndSetOfertaEdit(oferta: IListOferta) {
    setColetaForEdit(oferta)
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
      <Content>
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
              onClick={async () => {
                await getColetas(selectDate.initDate, selectDate.lastdate);
              }}
            >
              Buscar
            </Button>
          </Flex>
        </header>
        <OfertaTable
          ofertas={listColeta}
          submit={submitOferta}
          deleteFn={deleteColeta}
          edit={handleOpenAndSetOfertaEdit}
        />
      </Content>

      <Modal
        title="Editar Dizimo"
        open={open}
        onOk={async () => {
          editColeta(coletaForEdit)
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
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
          <Flex orientation="vertical" gap={0}>
            <Typography.Title level={5}>Valor</Typography.Title>
            <Input
              placeholder="Nome"
              value={formatedValueForDecimal(coletaForEdit?.valor)}
              onChange={(e) => {
                setColetaForEdit(prev => {

                  return {
                    ...prev,
                    valor: e.target.value.replace(/\D/g, "")
                  }
                })
              }}
            />
          </Flex>
        </Flex>
      </Modal>
      {contextHolder}
    </Container>
  );
}
