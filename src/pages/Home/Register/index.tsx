import React, { useState } from 'react'
import { useAuth } from "../../../context/Auth"
import { Button, Collapse, Form, Input, Typography } from 'antd'


export function RegisterPage() {

  const { } = useAuth()
  const [form] = Form.useForm();
  const [key, setKey] = useState('adm')



  return (
    <Form
      layout="vertical"
      form={form}
      size='medium'
    >
      <Collapse
        items={[
          {
            key: 'adm',
            label: 'Administrador Paroquia',
            children:
              <>
                <Form.Item label="Nome" required>
                  <Input placeholder="Digite o Nome" />
                </Form.Item>
                <Form.Item label="Email" required>
                  <Input placeholder="Digite o Email" />
                </Form.Item>
                <Form.Item label="Senha" required>
                  <Input type={'password'} placeholder="Digite a Senha" height={50} />
                </Form.Item>
                <Form.Item label="Repita a Senha" required>
                  <Input type={'password'} placeholder="Digite a Senha" height={50} />
                </Form.Item>
              </>
          },
          {
            key: 'theos',
            label: 'Login Theos',
            children:
              <>
                <Form.Item label="Email Theos" required>
                  <Input placeholder="Digite o Email" />
                </Form.Item>
                <Form.Item label="Senha Theos" required>
                  <Input placeholder="Digite a Senha" height={50} />
                </Form.Item>
              </>
          },
        ]} />
      <Form.Item style={{ marginTop: 10 }}>
        <Button type="primary">Criar Usuário</Button>
      </Form.Item>
    </Form>

  )
}