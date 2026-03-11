import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { MainRouter } from './routes'





function App(){
    return(<>
    <MainRouter/>
    </>)
}



const rootElement = createRoot(document.getElementById('root'))

rootElement.render(<App/>)