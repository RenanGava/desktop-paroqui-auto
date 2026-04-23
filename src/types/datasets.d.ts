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
      centroCustoId: string;
    };
    fiel: {
      id: number;
      documentId: string;
      nome: string;
      dizimistaId: string;
    };
  }

  interface IListOferta {
    id: number;
    valor: string;
    documentId: string;
    data_lancamento: string;
    comunidade: {
      id: number;
      documentId: string;
      nome: string;
      theosId: string;
      centroCustoId: string;
    };
  }

  interface IListColeta {
    id: number;
    valor: string;
    documentId: string;
    data_lancamento: string;
    comunidade: {
      id: number;
      documentId: string;
      nome: string;
      theosId: string;
      centroCustoId: string;
    };
    tipo_coleta: {
      documentId: string;
      tipo: string;
      theosContaId: string;
      theosTipoDocId: string;
      theosHistoricoId: string;
      theosColetaId: string;
    };
  }

  interface IListComunidades {
    nome: string;
    documentId: string;
    theosId: string;
    centroCustoId: string;
  }

  interface ITiposColetas {
    tipo: string;
    theosContaId: Number;
    theosColetaId: Number;
    theosTipoDocId: Number;
    theosHistoricoId: Number;
  }

  interface IListFiel {
    dizimistaId: string;
    cpf: string;
    nome: string;
    data_nascimento: string;
    comunidadeTheosId: string;
  }
}
