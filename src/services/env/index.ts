import { ipcMain } from 'electron'
import 'dotenv/config'


const URL =
    process.env.NODE_ENV === "development"
        ? process.env.API_LOCAL_URL
        : process.env.API_URL;


ipcMain.handle('tete', async (event, data) => {
    console.log(process.env.EMAIL);
    
    return {
        API_URL: URL
    }
})
