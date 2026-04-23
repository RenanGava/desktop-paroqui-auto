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
  "sendOne-coleta",
  async (event: IpcMainInvokeEvent, data: IListColeta) => {
    console.log(data);

    try {
      const res = await theosApi.post(
        "/EclesialContabilCoreCadastros/api/v1/lancamentocaixa",
        {
          partidas: [
            {
              valor: Number(data.valor) / 100,
              tipoDocumentoId: data.tipo_coleta.theosTipoDocId,
              documento: null,
              contaId: data.tipo_coleta.theosContaId,
              bancoId: null,
              historicoId: data.tipo_coleta.theosHistoricoId,
              historicoComplementar: "",
            },
          ],
          lancamentoPadraoId: data.tipo_coleta.theosColetaId,
          organismoId: "2919",
          dataLancamento: data.data_lancamento,
          tipoEntradaSaida: 0,
          centroCustoId: data.comunidade.centroCustoId,
          exigeAnexo: false,
          possuiAnexo: false,
        },
      );
    } catch (error) {
      throw error;
    }
  },
);

ipcMain.handle("syncColetas", async (event) => {
  const res = await theosApi.post(
    "/EclesialContabilCoreCadastros/api/v1/lancamentopadrao/search",
    {
      tipoEntradaSaida: 0,
      organismoId: 2919,
      pageNumber: 1,
      pageSize: 50,
      telaSistema: 1,
      filterParameters: [
        {
          propriedade: "descricao",
          tipo: "1",
          termo: "coleta",
          termoFinal: null,
        },
      ],
    },
  );

  const listColeta = res.data.data as Array<{ id: Number }>;

  const coletaIdList = listColeta.map((coleta) => {
    return {
      id: coleta.id,
    };
  });

  const coletaConfigPromises = coletaIdList.map(async (coleta) => {
    // console.log(coleta);
    
    return await theosApi.post(
      "/EclesialContabilCoreCadastros/api/v1/lancamentopadrao/getformovimento",
      {
        id: coleta.id,
        organismoId: "2919",
        telaSistema: 1,
      },
    );
  });

  const listColetaConfig:ITiposColetas[] = []
  console.log(listColetaConfig);
  

  for await(let confColeta of coletaConfigPromises){
    listColetaConfig.push({
      tipo: confColeta.data.descricao,
      theosColetaId: confColeta.data.id,
      theosContaId: confColeta.data.conta.id,
      theosHistoricoId: confColeta.data.historico.id,
      theosTipoDocId: confColeta.data.tipoDocumento.id
    })
  }


  return listColetaConfig


});
