import React, { useState } from 'react'
import { useAuth } from "../../../context/Auth"
import { Button, Divider, Form, Input, } from 'antd'
import { api } from '../../../utils/axios';


export function RegisterPage() {

  const { register } = useAuth()
  const [form] = Form.useForm();


  async function handleRegister(formValues: any) {
    register({
      email: formValues.email,
      password: formValues.password,
      username: formValues.username
    }).then(async (user) => {
      const theosData = await window.api.loginTheos({
        Email: formValues.theosEmail,
        Senha: formValues.theosPassword
      })

      window.local.saveData({
        Email: formValues.theosEmail,
        Senha: formValues.theosPassword
      })

      await api.post('/paroquias', {
        data: {
          ...theosData,
          user: {
            connect: [
              { documentId: user.documentId }
            ]
          }
        }
      }, {
        timeout: 5000
      })


    })



  }


  return (
    <Form
      layout="vertical"
      form={form}
      size='medium'
      onFinish={handleRegister}
    >
      <Form.Item label="Nome" name={'username'} required>
        <Input placeholder="Digite o Nome" />
      </Form.Item>
      <Form.Item label="Email" name={'email'} required>
        <Input placeholder="Digite o Email" />
      </Form.Item>
      <Form.Item label="Senha" name={'password'} required>
        <Input type={'password'} placeholder="Digite a Senha" height={50} />
      </Form.Item>
      <Divider>
        Dados Theos Eclesial
      </Divider>
      <Form.Item label="Email Theos" name={"theosEmail"} required>
        <Input placeholder="Digite o Email" />
      </Form.Item>
      <Form.Item label="Senha Theos" name={'theosPassword'} required>
        <Input placeholder="Digite a Senha" height={50} />
      </Form.Item>
      <Form.Item style={{ marginTop: 10 }}>
        <Button type="primary" htmlType='submit'>Criar Usuário</Button>
      </Form.Item>
    </Form>

  )
}