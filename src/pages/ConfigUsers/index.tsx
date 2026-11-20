import React, { useEffect, useState } from "react";
import { Button, Table, Switch, Flex, Tooltip, Popconfirm, TabPaneProps, TableProps, message } from "antd";

import { Container, Content } from "./styles";
import { api } from "../../utils/axios";
import { stringify } from "qs";
import { useAuth } from "../../context/Auth";

const cols: TableProps<IBlockedUser>['columns'] = [
  {
    key: 'id',
    dataIndex: 'id',
    title: "ID",
  },
  {
    key: 'username',
    dataIndex: 'username',
    title: "Nome",
  },
  {
    key: 'comunidade',
    dataIndex: ['comunidade', 'nome'],
    title: "Comunidade",
  }
]

export function ConfigUsers() {

  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [blockedUsers, setBlockedUsers] = useState<IBlockedUser[]>([])
  const [messageApi, context] = message.useMessage()

  const { Column } = Table

  useEffect(() => {

    const configReq = stringify({
      filters: {
        comunidade: {
          paroquia: {
            id: {
              $eq: user?.paroquia.id
            }
          }
        }
      },
      populate: ['comunidade']
    })
    api.get('/users?' + configReq).then(res => {
      const listUser = res.data as Omit<IBlockedUser, 'key'>[]
      console.log(res.data);



      const mappedData = listUser.map(user => ({ key: user.id, ...user }))
      setBlockedUsers(mappedData)
    })
  }, [])


  async function handleChangeStatus(status: boolean, user: IBlockedUser) {

    try {
      await api.post(`/auth/send-email-confirmation`, {
        email: user.email
      })

      messageApi.success(`Usuário ${user.username} Liberado`)
      setBlockedUsers(prevState => prevState.map(usr => {

        if (usr.documentId === user.documentId) {
          usr.confirmed = status
        }
        return usr
      }))
    } catch (error) {
      messageApi.error(`Ocorreu um Erro ao Liberar${user.username}`)
    }

  }
  return (
    <Container>
      {context}
      <h5>Liberar Usuários</h5>
      <Content>
        <Table<IBlockedUser>
          dataSource={blockedUsers}
          rowKey={'id'}
          columns={[
            ...cols!,
            {
              key: 'action',
              title: 'Liberado?',
              render(val) {
                return <Switch
                  checked={val.confirmed}
                  onChange={(e) => {
                    handleChangeStatus(e, val as IBlockedUser)
                  }
                  } />
              }
            }
          ]}
          style={{ width: 560 }}
        >
        </Table>
      </Content>
    </Container>
  );
}