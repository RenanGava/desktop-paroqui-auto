import React, { MouseEvent, useState } from "react";
import { Container, Content } from "./styles";
import { OfertaTable } from "../../components/Dashboard/Oferta";
import { Button, DatePicker, Flex, Input, Modal, Typography } from "antd";
import dayjs from "dayjs";
import { useOferta } from "../../hooks/useOferta";
import { useNavigate } from "react-router";
import { formatedValueForDecimal } from "../../utils/formatedValue";
import { SearchComponent } from "../../components/SearchComponent";

export function OfertaDash() {
  const [open, setOpen] = useState(false);

  const {
    selectDate,
    contextHolder,
    listOferta,
    ofertaForEdit,
    getOfertas,
    setSelectDate,
    setOfertaForEdit,
    editDizimo,
    submitOferta,
    deleteOferta,
  } = useOferta();
  const format = "DD/MM/YYYY";

  const navigate = useNavigate();

  function handleOpenAndSetOfertaEdit(oferta: IListOferta) {
    setOfertaForEdit(oferta);
    setOpen(true);
  }

  return (
    <Container>
      <Content>
        <header>

          <SearchComponent
            getData={getOfertas}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        </header>
        <OfertaTable
          ofertas={listOferta}
          submit={submitOferta}
          deleteFn={deleteOferta}
          edit={handleOpenAndSetOfertaEdit}
        />
      </Content>

      <Modal
        title="Editar Dizimo"
        open={open}
        onOk={async () => {
          editDizimo(ofertaForEdit);
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
              value={formatedValueForDecimal(ofertaForEdit?.valor)}
              onChange={(e) => {
                setOfertaForEdit((prev) =>
                  prev
                    ? {
                        ...prev,
                        valor: e.target.value.replace(/\D/g, ""),
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
