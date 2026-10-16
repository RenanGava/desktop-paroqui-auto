// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("local", {
  saveData: async (data: IDataLoginTheos)=> await ipcRenderer.invoke("storage", data)
});

contextBridge.exposeInMainWorld("api", {
  loginTheos: async (data: IDataLoginTheos) => {
    return await ipcRenderer.invoke("login-theos", data);
  },
  sendOneDizimo: async (data: IListDizimo) => {
    return ipcRenderer.invoke("send-dizimo", data);
  },
  bulkDizimo: async (data: IListDizimo[]) => {
    return ipcRenderer.invoke('dizimo:bulk-insert', data)
  },
  sendOneOferta: async (data: IListOferta) => {
    return ipcRenderer.invoke("sendOne-oferta", data);
  },
  sendOneColeta: async (data: IListColeta) => {
    return ipcRenderer.invoke("sendOne-coleta", data);
  },
  syncColetas: async () => {
    return (await ipcRenderer.invoke("syncColetas")) as IColetas[]
  },
  configColeta: async (coleta: IColetas) => {
    return await ipcRenderer.invoke('configColeta', coleta)
  },
  syncComunidades: async () => {
    return await ipcRenderer.invoke("syncComunidades");
  },
  syncFieis: async () => {
    return await ipcRenderer.invoke("getFieis");
  },
  createFieis: async (data: FielProps) => {
    return await ipcRenderer.invoke('createFiel', data)
  }
});
