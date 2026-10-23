import React from 'react'
import { useAuth } from "../../../context/Auth"
import { Button, Flex, Form, Input, Space, Typography } from 'antd'
import type { FormProps } from 'antd'
import { Container, Content } from './styles'
import { useConfig } from '../../../context/Config'
import { message } from 'antd'
import { Link } from 'react-router'


interface FormData {

    identifier: string
    password: string
}



export function LoginPage() {

    const { login } = useAuth()
    const { } = useConfig()
    const [form] = Form.useForm();



    async function handleLogin({ identifier, password }: FormData) {
        const loginData = await login(identifier, password)
    }



    return (

        <Container>
            <Content>
                
                <Form
                    layout="vertical"
                    form={form}
                    size='medium'
                    onFinish={handleLogin}
                >
                    <Form.Item
                        label="Email"
                        name={'identifier'}
                        required
                        rules={[
                            {
                                required: true,
                                message: "Email Obrigatório",
                            }
                        ]}
                    >
                        <Input placeholder="Digite o Email" />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        name={'password'}
                        required
                        rules={[
                            { required: true, message: "Senha Obrigatória!" }
                        ]}>
                        <Input placeholder="Digite a Senha" height={50} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'>Entrar</Button>
                    </Form.Item>
                </Form>
                <Flex
                    orientation='horizontal'
                    justify='space-around'

                >
                        <Link to={"/register-config"}>Cadastrar Usuário</Link>
                        {/* <Link to={""}>Esqueceu a Senha?</Link> */}
                </Flex>
            </Content>
        </Container>
    )
}