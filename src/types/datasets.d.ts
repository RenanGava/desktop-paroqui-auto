export {};

declare global {
  interface IListDizimo {
    id: number;
    valor: string;
    documentId: string;
    data_lancamento: string;
    comunidade: {
      id: number;
      documentId: string;
      nome: string;
      theosId: string;
      centroCustoId: string
    };
    fiel: {
      id: number;
      documentId: string;
      nome: string;
      dizimistaId: string;
    };
  }
}
