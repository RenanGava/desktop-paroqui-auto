import React, { useEffect, useState } from "react";
import { Container, Content, HeaderMenu } from "./style";
import type { MenuProps } from "antd";
import { Link, useLocation } from "react-router";

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: (<Link to={"/dizimo"}>Dizimo</Link>),
    key: 'dizimo',
  },
  {
    label: (<Link to={"/oferta"}>Oferta</Link>),
    key: 'oferta',
  },
  {
    label: (<Link to={"/coleta"}>Coleta</Link>),
    key: 'coleta',
  },
  {
    label: (<Link to={"/fieis"}>Fieis</Link>),
    key: 'fieis',
  },
  {
    key: 'config',
    label: 'Config App',
    disabled: false,
    children: [
      {
        label: (<Link to={"/conf-coletas"}>Configurar Lançamentos e Coletas</Link>),
        key: 'config-coletas',
      },
      {
        label: (<Link to={"/conf-users"}>Liberar Acesso de Usuários</Link>),
        key: 'users-access',
      },
    ]
  }
]

export function Header() {

  const [tab, setTab] = useState('')
  const location = useLocation()


  useEffect(()=> {
    
    setTab(location.pathname.replace('/', ''))
  },[])

  function handleTab(e: any) {
    setTab(e.key)
  }
  return (
    <Container>
      <Content>
        <HeaderMenu
          onClick={handleTab}
          selectedKeys={[tab]}
          items={items}
        />
      </Content>
    </Container>
  );
}
