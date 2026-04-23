export {};

declare global {
  interface Window {
    api: {
      loginTheos: () => Promise<void>;
      sendOneDizimo: (data:IListDizimo) => Promise<string>;
      sendOneOferta: (data: IListOferta) => Promise<void>;
      sendOneColeta: (data: IListColeta) => Promise<void>;
      syncColetas:() => Promise<ITiposColetas[]>
      syncComunidades:() => Promise<IListComunidades[]>
      syncFieis: () => Promise<IListFiel[]>
    };
    env: {
      API_URL: string;
      EMAIL: string;
      SENHA: string;
    };
  }
}
