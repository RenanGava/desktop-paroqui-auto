import { ipcMain } from "electron";
import "dotenv/config";

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.API_LOCAL_URL
    : process.env.API_URL;

ipcMain.on("envs", (event) => {
  console.log(process.env.NODE_ENV);

  event.returnValue = {
    API_URL: URL,
    EMAIL: process.env.EMAIL,
    SENHA: process.env.SENHA
  };
});
