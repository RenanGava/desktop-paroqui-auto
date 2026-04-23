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

ipcMain.handle("sendOne-oferta", async (event, data: IListOferta) => {
  try {
    await theosApi.post("/EclesialParoquia/api/v1/ofertaLancamento", {
      anonima: true,
      data: dayjs(data.data_lancamento).format("DD/MM/YYYY"),
      tipoRecebimento: {
        tipo: 0,
        descricao: "Caixa",
        isCaixa: true,
        liberado: true,
        codigo: "00000000",
        visible: true,
      },
      tipo: {
        id: 5,
        nome: "Oferta Comum",
        classificacaoFinanceira: {
          descricao: "Oferta (Integração)",
          codigo: 27,
          historicoQuitacaoId: 11500,
          complementoHistoricoQuitacao: null,
          destino: 0,
          situacao: 0,
          dioceseId: null,
          id: 22404,
        },
      },
      valor: Number(data.valor) / 100,
      lancamentoViaPix: false,
      comunidade: {
        nome: data.comunidade.nome,
        id: data.comunidade.theosId,
        centroCusto: {
          id: data.comunidade.centroCustoId,
        },
      },
    });
  } catch (error) {
    throw error;
  }
});
