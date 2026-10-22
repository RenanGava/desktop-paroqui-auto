import React from 'react'
import { Outlet } from 'react-router'
import {Steps} from 'antd'
import { ConfigContextProvider } from '../../context/Config'



export function RegisterRoutes() {


    return (
        <ConfigContextProvider>
            <Steps/>
            <Outlet />
        </ConfigContextProvider>
    )
}