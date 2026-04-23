// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import { api } from './utils/axios'


contextBridge.exposeInMainWorld('env', {
    ...ipcRenderer.sendSync('envs')
}
)

contextBridge.exposeInMainWorld('api', {
    loginTheos: async () => {
        ipcRenderer.invoke('loginTheos')
    },
    sendOneDizimo: async (data: IListDizimo) => {
        return ipcRenderer.invoke('send-dizimo', data)
    },
    sendOneOferta: async (data:IListOferta) => {
        return ipcRenderer.invoke('sendOne-oferta', data)
    },
    sendOneColeta: async (data:IListColeta) => {
        return ipcRenderer.invoke('sendOne-coleta', data)
    },
    syncColetas: async () => {
        return await ipcRenderer.invoke('syncColetas') as ITiposColetas[]
    },
    syncComunidades: async () => {
        return await ipcRenderer.invoke('syncComunidades')
    },
    syncFieis: async () => {
        return await ipcRenderer.invoke('getFieis')
    }
})