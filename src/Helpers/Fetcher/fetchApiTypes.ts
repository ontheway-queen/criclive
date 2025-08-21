export interface IFetcherParamsData {
  url: string;
  contentType?: string | null;
  body: any;
}

export interface IFetcher {
  get: (url: string) => any;
  post: (postData: IFetcherParamsData) => any;
  put: (putData: IFetcherParamsData) => any;
  delete: (url: string) => any;
}
