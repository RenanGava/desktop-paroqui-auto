export { };

declare global {

  interface SelectDate {
    initDate: string;
    lastdate: string;
  }
  
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
    ativo?: boolean
  }
  interface IColetas {
    id: string;
    descricao: string;
  }

  interface IListFiel {
    dizimistaId: string;
    cpf: string;
    nome: string;
    comunidadeTheosId: string;
  }


  interface FielProps {
    id: number
    documentId: string
    cpf: string
    sexo: string
    nome: string
    dizimistaId: string
    comunidade: {
      nome: string;
      documentId: string;
      theosId: string;
      centroCustoId: string;
    }
  }
}
