import React from 'react'
import { Outlet } from 'react-router'
import {Steps} from 'antd'



export function RegisterRoutes() {




    return (
        <>
            <Steps/>
            <Outlet />
        </>
    )
}