// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'


contextBridge.exposeInMainWorld('env', {
    variable: async () => ipcRenderer.invoke('tete')
}
)


contextBridge.exposeInMainWorld('api', {
    loginTheos: async () => {
        ipcRenderer.invoke('loginTheos')
    }
})