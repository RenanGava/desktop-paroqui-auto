import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from 'antd'
import { LoginPage } from "./Login";
import { Container, Content } from "./style";
import { RegisterPage } from "./Register";




const screens: TabsProps['items'] = [
    {
        key: 'login',
        label: 'Login',
        children: <LoginPage />
    },
    {
        key: 'register',
        label: 'Cadastro',
        children: <RegisterPage />,
    }
]


export function HomePage() {





    return (
        <Container>
            <Content>
                <Tabs defaultActiveKey="login" items={screens}/>
            </Content>
        </Container>
    )
}