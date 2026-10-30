import React, { useState } from 'react'
import { useAuth } from "../../../context/Auth"
import { Button, Divider, Form, Input, message, } from 'antd'
import { api } from '../../../utils/axios';
import { useConfig } from '../../../context/Config';
import { Link, useNavigate } from 'react-router';
import { Container, Content } from './styles';



export function RegisterPage() {

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage()
  const { SetCurrentStep, currentStep } = useConfig()
  const { register } = useAuth()
  const navigate = useNavigate()


  async function handleRegister(formValues: IRegisterFormData) {
    
    try {

      const user = await register(formValues)

      SetCurrentStep(currentStep+1)
      navigate('/register-config/comunidades')
    } catch (error) {
      messageApi.error('ocorreu um erro')
    }

  }

  return (

    <Container>
      {contextHolder}
      <Content>
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

      </Content>
    </Container>

  )
}