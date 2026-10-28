import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Steps, Card, Flex } from 'antd'
import { ConfigContextProvider, useConfig } from '../../context/Config'
import { Content } from './styles'



export function RegisterRoutes() {

    const { currentStep, SetCurrentStep } = useConfig()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const routes = [
        '/register-config',
        '/register-config/comunidades',
        '/register-config/fieis'
    ]


    useEffect(() => {
        SetCurrentStep(routes.indexOf(pathname))
    }, [])
    

    return (
        <Flex
            orientation='vertical'
            style={{
                padding: 16
            }}
        >
            <Content>
                <Steps
                    current={currentStep}
                    onChange={current => {

                        if (current <= currentStep) {
                            navigate(routes[current])
                            SetCurrentStep(current)

                        }
                    }}
                    items={[
                        {
                            title: "Formulario de Cadastro",
                            content: "Usuario e login Theos"
                        },
                        {
                            title: "Configurar Comunidades",
                            content: "Dados Usuario e Theos"
                        },
                        {
                            title: "Configurar Fieis",
                            content: "Dados Usuario e Theos"
                        }
                    ]}
                />
            </Content>
            <Outlet />
        </Flex>

    )
}