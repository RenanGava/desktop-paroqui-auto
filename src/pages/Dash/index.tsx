import React, { MouseEvent } from "react";





export function Dash(){

    async function handleClick(e:MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        window.api.getData()

        console.log(window)
        
    }


    return(
        <div>
            <h1>Dash</h1>
            <button onClick={handleClick}>Click e abra o Chromium</button>
        </div>
    )
}