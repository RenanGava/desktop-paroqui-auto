import { ipcMain } from 'electron'
import { PupAutomation } from '../../puppeteer'
import url from '../../puppeteer/url'
import 'dotenv/config'




export default (() => {
    ipcMain.handle('getFieis', async (event) => {
        const pupInstance = await PupAutomation.getInstance()
        const { browser } = await pupInstance.getPup()
        const [page] = await browser.pages()

        console.log(process.env.NODE_ENV);
        

        // pvaguadalupe@gmail.com
        // 1109
        await page.goto(url.loginPage)
        await page.waitForSelector('input[name="email"]')
        await page.type('input[name="email"]', 'pvaguadalupe@gmail.com')
        await page.type('input[name="senha"]', '1109')
        await page.click('button#login-input-entrar')

    })
})
