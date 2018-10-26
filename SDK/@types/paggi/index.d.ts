declare function createRequest(
  method: string,
  url: string,
  headers?: object,
  body?: object
): Paggi.Response;
declare namespace Paggi {
  interface Environment {
    setToken(token: string): boolean;
    setEnvironment(env: string): boolean;
    setPartnerIdByToken(token: string): boolean;
    getToken(): string;
    getEnvironment(): string;
    getPartnerId(): string;
  }

  interface Card {
    create(params: object): any;
    del(id: string): any;
  }

  interface Bank {
    find(): object;
  }

  interface Orders {
    create(params: object): object;
    capture(id: string, params?: object): object;
    cancel(id: string): object;
  }
}
export = Paggi;
