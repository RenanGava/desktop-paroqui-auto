import styled from 'styled-components'




export const Container = styled.div`
    width: 100%;
    border-radius: 5px;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    



    & > h5{
        text-align: center;
        font-size: 30px;
        font-family: sans-serif;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    
    
`


export const Content = styled.div`
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-evenly;
    
    gap: 60px;



    @media (max-width: 1000px){
        flex-direction: column;
        align-items: center;
    }

`


export const Title = styled.h5`
    padding: 5px;
    
`

export const Icon = styled.div`
`