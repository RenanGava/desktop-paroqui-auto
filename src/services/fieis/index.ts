import { ipcMain, IpcMainInvokeEvent } from "electron";
import { PupAutomation } from "../../puppeteer";
import url from "../../puppeteer/url";
import { config } from "dotenv";
import {} from '../../../'
config({
    path: process.env.NODE_ENV === 'development'? '.env.local': '.env.production'
})

ipcMain.handle("loginTheos", async () => {
  const pupInstance = await PupAutomation.getInstance();
  const { browser } = await pupInstance.getPup();
  const [page] = await browser.pages();
  console.log(process.env.EMAIL);
  

  // pvaguadalupe@gmail.com
  // 1109
  await page.goto(url.loginPage);
  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', "pvaguadalupe@gmail.com");
  await page.type('input[name="senha"]', "1109");
  await page.click("button#login-input-entrar");
//   page.on('response', async (res) => {
//     const response = res.request()

//     const cep = (await res.json()).organismoCep
//     if(cep !== undefined){
//         console.log({cep: cep});
        
//     }
//   })

});

ipcMain.handle("send-dizimo", async (event: IpcMainInvokeEvent, data) => {
    const pupInstance = await PupAutomation.getInstance()
    const { browser, page } = await pupInstance.getPup()
    await page.goto(url.lancamentoDizimoPage)

    return;
});

ipcMain.handle("sendAll-dizimo", async (event: IpcMainInvokeEvent, data) => {
    const pupInstance = await PupAutomation.getInstance()
    const { browser, page } = await pupInstance.getPup()
    await page.goto(url.lancamentoDizimoPage)
    return;
});
