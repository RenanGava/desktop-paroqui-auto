import { ipcMain } from "electron";
import "dotenv/config";
import { clearKeys, getKey, setKey } from "../../../utils/storage";

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.API_LOCAL_URL
    : process.env.API_URL;

ipcMain.handle("storage", async (event, data: IDataLoginTheos) => {
  

  setKey('email', data.Email)
  setKey('pass', data.Senha)
});
