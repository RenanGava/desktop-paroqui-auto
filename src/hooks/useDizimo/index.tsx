import React, { useEffect, useState } from "react";
import { api } from "../../utils/axios";







export function useDizimo(){

    const [listDizimo, setListDizimo] = useState([])


    useEffect(() => {

        async function getDizimos(){
            const dizimos = await api.get('')

        }


        getDizimos()
    }, [])


    return {
        listDizimo
    }
}