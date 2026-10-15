import { ipcMain } from "electron";
import axios from "axios";

interface IDataLoginTheos {
    Email: string,
    Senha: string
}


ipcMain.handle("login-theos", async (event, data: IDataLoginTheos) => {

    const theosLogin = new FormData()

    theosLogin.append('Email', data.Email)
    theosLogin.append('Senha', data.Senha)
    
    const resLogin = await axios.post('http://eclesial.theos.com.br/EclesialIdentityHub/api/v1/Authentication',
        theosLogin
    )

    const theosData = {
        // dioceseId: resLogin.data.dioceseId,
        organismoId: resLogin.data.organismoId,
        cnpj: resLogin.data.cnpj,
        organismoCodigo: resLogin.data.organismoCodigo,
        theosEmail: data.Email,
        theosPass: data.Senha,
        idParoquiaCuria: resLogin.data.idParoquiaCuria,
        nome: resLogin.data.organismoNome
    }

    return theosData
});
