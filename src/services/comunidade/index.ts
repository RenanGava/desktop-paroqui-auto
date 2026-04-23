import { ipcMain, IpcMainInvokeEvent } from "electron";
import { theosApi } from "../../utils/theosData/api";

ipcMain.handle("syncComunidades", async (event: IpcMainInvokeEvent) => {
  const resComunidade = await theosApi.post(
    "/EclesialParoquia/api/v1/comunidade/search",
    [
      {
        property: "Nome",
        condition: 1,
        value: "",
      },
    ],
  );
  const comunidadesTheos = resComunidade.data as Array<{
    centroCustoId: number;
    centroCustoInativo: boolean;
    nome: string;
    id: number;
  }>
  const mappedComunidades = comunidadesTheos.map( comunidade => ({
    nome: comunidade.nome,
    theosId: comunidade.id.toString(),
    centroCustoId: comunidade.centroCustoId.toString()
  }))

  return mappedComunidades
});
