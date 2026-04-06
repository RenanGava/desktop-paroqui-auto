import { ipcMain, IpcMainInvokeEvent } from "electron";
import { PupAutomation } from "../../puppeteer";
import url from "../../puppeteer/url";
import { config } from "dotenv";
import { api } from "../../utils/axios";
import dayjs from "dayjs";
import "../../utils/storage";
import { theosApi } from "../../utils/theosData/api";
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
    // const pupInstance = await PupAutomation.getInstance();
    // const { browser, page } = await pupInstance.getPup();
    // await page.goto(url.lancamentoDizimoPage);
    // const formatValue = (parseFloat(data.valor) / 100)
    //   .toFixed(2)
    //   .replace(".", ",");

    // await page.locator('input[id="tipoLeitura0"]').click({
    //   count: 3,
    // });

    // await page.type('input[id="tipoLeitura0"]', data.fiel.dizimistaId);

    // await page.evaluate((data) => {
    //   const formatValue = (parseFloat(data.valor) / 100)
    //     .toFixed(2)
    //     .replace(".", ",");

    //   const dateSplit = data.data_lancamento.split("-");
    //   const dateReverse = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`

    //   console.log(dateReverse);
    //   const dizimistaId = document.querySelector<HTMLInputElement>("#tipoLeitura0");
    //   const mes = document.querySelector<HTMLInputElement>("#mesReferente");
    //   const ano = document.querySelector<HTMLInputElement>("#anoReferente");
    //   const date = document.querySelector<HTMLInputElement>("#dataOferta");
    //   const valueDizimo = document.querySelector<HTMLInputElement>('#valorOferta')
    //   const btnNovo = document.querySelector<HTMLButtonElement>('btnNovo')

    //   dizimistaId.value = data.fiel.dizimistaId;
    //   mes.value = dateSplit[1];
    //   ano.value = dateSplit[0];
    //   date.value = dateReverse

    // }, data);

    // await page.click('input[id="valorOferta"]', {
    //     count: 3
    // })
    // await page.type('input[id="valorOferta"]', formatValue);

    // await page.click('button[id="btnNovo"]')

    const dateSplit = data.data_lancamento.split("-");
    const dateReverse = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
    const fielData = await theosApi.post(
      "/EclesialFieisCadastros/api/v1/Fiel/search",
      {
        page: 1,
        pageSize: 50,
        filter: [
          {
            property: "dizimistaId",
            condition: 0,
            conditionStart: parseInt(data.fiel.dizimistaId),
            conditionEnd: null,
            textCondition:
              "Código dizimista igual " + parseInt(data.fiel.dizimistaId),
          },
        ],
      },
    );
    // {
    //   id: 8095992,
    //   nome: "RENAN DELLECRODE GAVA",
    //   codigoDizimista: 22,
    //   dataNascimento: "26/10/2001",
    //   cpf: "18764005798",
    //   conjuge: null,
    //   comunidade: "ALTO BOA VISTA",
    //   comunidadeId: 46148,
    //   pai: "ADILSON NOGUEIRA GAVA",
    //   mae: "MARIA DA PENHA DELLECRODE GAVA",
    //   email: null,
    //   endereco: "ZONA RURAL",
    //   bairro: "ALTO BOA VISTA",
    //   complemento: "",
    //   cep: "29295-000",
    //   estado: "ES",
    //   cidade: "Vargem Alta",
    //   cartaoMagnetico: "equipe",
    //   benfeitorId: null,
    //   grupo: null,
    //   _Contato: "28000000000",
    //   contato: "(28) 00000-0000",
    //   sexo: "M ",
    //   inativo: 0,
    // };

    const fiel = fielData.data.result.data[0];

    const resDizimo = await theosApi.post("/EclesialParoquia/api/v1/dizimo", {
      data: dateReverse,
      anoReferente: dateSplit[0],
      mesReferente: dateSplit[1],
      valor: parseFloat(data.valor) / 100,
      tipoRecebimento: {
        tipo: 0,
        descricao: "Caixa",
      },
      fiel: {
        dizimistaId: data.fiel.dizimistaId,
        id: fiel.id,
        nome: data.fiel.nome,
        nomeComunidade: data.comunidade.nome,
        comunidadeId: data.comunidade.theosId,
        comunidadeIdCentrosCustos: data.comunidade.centroCustoId,
        // cnpjCpf: data.fiel.cpf,
      },
      comunidade: {
        id: data.comunidade.theosId,
        nome: data.comunidade.nome,
        centroCusto: {
          id: data.comunidade.centroCustoId,
        },
      },
    });

    console.log(resDizimo.data);


    return;
  },
);

ipcMain.handle("sendOne-oferta", async (event, data: IListOferta) => {

  try {
    await theosApi.post('/EclesialParoquia/api/v1/ofertaLancamento', {
      "anonima": true,
      "data": dayjs(data.data_lancamento).format('DD/MM/YYYY'),
      "tipoRecebimento": {
        "tipo": 0,
        "descricao": "Caixa",
        "isCaixa": true,
        "liberado": true,
        "codigo": "00000000",
        "visible": true
      },
      "tipo": {
        "id": 5,
        "nome": "Oferta Comum",
        "classificacaoFinanceira": {
          "descricao": "Oferta (Integração)",
          "codigo": 27,
          "historicoQuitacaoId": 11500,
          "complementoHistoricoQuitacao": null,
          "destino": 0,
          "situacao": 0,
          "dioceseId": null,
          "id": 22404
        }
      },
      "valor": Number(data.valor) / 100,
      "lancamentoViaPix": false,
      "comunidade": {
        "nome": data.comunidade.nome,
        "id": data.comunidade.theosId,
        "centroCusto": {
          "id": data.comunidade.centroCustoId
        }
      }
    })
  } catch (error) {
    throw error
  }


});

ipcMain.handle("sendAll-dizimo", async (event: IpcMainInvokeEvent, data) => {
  const pupInstance = await PupAutomation.getInstance();
  const { browser, page } = await pupInstance.getPup();
  await page.goto(url.lancamentoDizimoPage);
  return;
});
