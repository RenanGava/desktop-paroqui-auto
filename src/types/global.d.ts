export {};

declare global {
  interface Window {
    api: {
      sendOneDizimo: (data:IListDizimo) => Promise<string>;
      bulkDizimo: (data:IListDizimo[]) => Promise<string>;
      sendOneOferta: (data: IListOferta) => Promise<void>;
      sendOneColeta: (data: IListColeta) => Promise<void>;
      syncColetas:() => Promise<any>
      loginTheos:(data: IDataLoginTheos) => Promise<any>
      syncComunidades:() => Promise<IListComunidades[]>
      configColeta: (data: IColetas) => Promise<ITiposColetas>
      syncFieis: () => Promise<IListFiel[]>
      createFieis: (data: FielProps) => Promise<FielProps>
    };
    local: {
      saveData: (data:IDataLoginTheos) => void
    }
  }
}
