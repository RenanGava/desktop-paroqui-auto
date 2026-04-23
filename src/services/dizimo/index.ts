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

ipcMain.handle(
  "send-dizimo",
  async (event: IpcMainInvokeEvent, data: IListDizimo) => {
    

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

