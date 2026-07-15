export {};

declare global {
  interface Window {
    api: {
      loginTheos: () => Promise<void>;
      sendOneDizimo: (data:IListDizimo) => Promise<string>;
      sendOneOferta: (data: IListOferta) => Promise<void>;
      sendOneColeta: (data: IListColeta) => Promise<void>;
      syncColetas:() => Promise<any>
      syncComunidades:() => Promise<IListComunidades[]>
      configColeta: () => Promise<ITiposColetas>
      syncFieis: () => Promise<IListFiel[]>
      createFieis: (data: FielProps) => Promise<FielProps>
    };
    env: {
      API_URL: string;
      EMAIL: string;
      SENHA: string;
    };
  }
}
