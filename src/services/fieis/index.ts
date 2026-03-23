import { ipcMain, IpcMainInvokeEvent } from "electron";
import { PupAutomation } from "../../puppeteer";
import url from "../../puppeteer/url";
import { config } from "dotenv";
// import {} from "../../../";
import dayjs from "dayjs";
config({
  path:
    process.env.NODE_ENV === "development" ? ".env.local" : ".env.production",
});

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
  await page.waitForNavigation();
  //   page.on('response', async (res) => {
  //     const response = res.request()

  //     const cep = (await res.json()).organismoCep
  //     if(cep !== undefined){
  //         console.log({cep: cep});

  //     }
  //   })
});

ipcMain.handle(
  "send-dizimo",
  async (event: IpcMainInvokeEvent, data: IListDizimo) => {
    const pupInstance = await PupAutomation.getInstance();
    const { browser, page } = await pupInstance.getPup();
    await page.goto(url.lancamentoDizimoPage);
    // await page.waitForNavigation();
    // await page.waitForSelector('input[id="tipoLeitura0"]', {
    //   visible: true
    // })
    const formatValue = (parseFloat(data.valor) / 100)
      .toFixed(2)
      .replace(".", ",");


    await page.locator('input[id="tipoLeitura0"]').click({
      count: 3
    })

    await page.type('input[id="tipoLeitura0"]', data.fiel.dizimistaId);

    await page.evaluate((data) => {
      const formatValue = (parseFloat(data.valor) / 100)
        .toFixed(2)
        .replace(".", ",");

      const dateSplit = data.data_lancamento.split("-");

      console.log(data)
      document.querySelector<HTMLInputElement>('#tipoLeitura0')
        .value = data.fiel.dizimistaId
      document.querySelector<HTMLInputElement>('#mesReferente').value = dateSplit[1]
      document.querySelector<HTMLInputElement>("#anoReferente")
        .value = dateSplit[0];
      document.querySelector<HTMLInputElement>("#dataOferta").value = dayjs(data.data_lancamento).format('DD/MM/YYYY')
    }, data);


    // await page.click('input[id="anoReferente"]', {
    //   count: 3,
    // });
    // await page.type('input[id="anoReferente"]', dateSplit[0], {
    //     delay: 100
    // })

    // await page.click('input[id="dataOferta"]', {
    //   count: 3,
    // });
    // await page.type(
    //   'input[id="dataOferta"]',
    //   dayjs(data.data_lancamento).format("DD/MM/YYYY"),
    // );
    // await page.click('input[id="valorOferta"]', {
    //     count: 3
    // })
    // await page.type('input[id="valorOferta"]', formatValue);

    // await page.click('button[id="btnNovo"]')
    return;
  },
);

ipcMain.handle("sendAll-dizimo", async (event: IpcMainInvokeEvent, data) => {
  const pupInstance = await PupAutomation.getInstance();
  const { browser, page } = await pupInstance.getPup();
  await page.goto(url.lancamentoDizimoPage);
  return;
});
