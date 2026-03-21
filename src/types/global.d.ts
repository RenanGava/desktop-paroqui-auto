export {};

declare global {
  interface Window {
    api: {
      loginTheos: () => Promise<void>;
      sendOneDizimo: (data:IListDizimo) => Promise<void>
    };
    env: {
      API_URL: string;
      EMAIL: string;
      SENHA: string;
    };
  }
}
