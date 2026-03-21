// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'


contextBridge.exposeInMainWorld('env', {
    ...ipcRenderer.sendSync('envs')
}
)


contextBridge.exposeInMainWorld('api', {
    loginTheos: async () => {
        ipcRenderer.invoke('loginTheos')
    },
    sendOneDizimo: async (data: IListDizimo) => {
        ipcRenderer.invoke('send-dizimo', data)
    }
})