import React from "react";
import { Container, TableContent, TBody, THeader } from "./style";
import { Dropdown, Button, MenuProps } from "antd";
import { List, PencilLine, Send } from "lucide-react";
import { useDizimo } from "../../../hooks/useDizimo";



export function DizimoTable() {
  const { listDizimo, getDizimos } = useDizimo();

  return (
    <Container>
      <TableContent>
        <THeader>
          <tr>
            <th>ID</th>
            <th>Fiel</th>
            <th>Valor</th>
            <th>Comunidade</th>
            <th>Enviar Todos</th>
          </tr>
        </THeader>
        <TBody>
          {listDizimo.map((dizimo) => {
            return (
              <tr key={dizimo.id}>
                <td>{dizimo.fiel.dizimistaId}</td>
                <td>{dizimo.fiel.nome}</td>
                <td>{(parseInt(dizimo.valor)/100)}</td>
                <td>{dizimo.comunidade.nome}</td>
                <td>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: "Editar",
                          icon: <PencilLine size={12} />,
                          onClick: () => {console.log('Aqui Estou Editando')},
                        },
                        {
                          key: "2",
                          label: "Enviar",
                          icon: <Send size={12} />,
                          onClick: () => {console.log('Aqui Estou Enviando')},
                        },
                      ],
                    }}
                    placement="top"
                    trigger={['click', 'hover']}
                    arrow={true}
                  >
                    <List size={20} />
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </TBody>
      </TableContent>
    </Container>
  );
}
