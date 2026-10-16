import React from 'react'
import { useAuth } from "../../../context/Auth"
import { Button, Form, Input, Typography } from 'antd'
import type {FormProps} from 'antd'


interface FormData{

    identifier: string
    password: string
}



export function LoginPage() {

    const { login } = useAuth()
    const [form] = Form.useForm();
    

    
    async function handleLogin({ identifier, password }:FormData){
        const loginData = await login(identifier, password)
    }



    return (
        <Form
            layout="vertical"
            form={form}
            size='medium'
            onFinish={handleLogin}
        >
            <Form.Item label="Email" name={'identifier'} required>
                <Input placeholder="Digite o Email" />
            </Form.Item>
            <Form.Item label="Senha" name={'password'} required>
                <Input placeholder="Digite a Senha" height={50} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit'>Entrar</Button>
            </Form.Item>
        </Form>
    )
}