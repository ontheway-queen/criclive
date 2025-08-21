import { IFetcher, IFetcherParamsData } from './fetchApiTypes';
import { BaseUrl } from '../Constant';

// object for request
// const { atb_traning } = parseCookies();

const obj: RequestInit = {
  mode: 'cors',
  credentials: 'include',
  // headers: { Authorization: `Bearer ${__u_os}` },
};

// fetch object for fetch data
const fetcher: IFetcher = {
  // get data fetcher
  get: async (url: string) => {
    try {
      const res: Response = await fetch(`${BaseUrl}${url}`);
      const data = await res.json();
      return data;
    } catch (error) {
      alert(error);
    }
  },

  // post data fetcher
  post: async ({ url, contentType, body }: IFetcherParamsData) => {
    obj.method = 'POST';
    if (contentType === 'application/json') {
      // obj.headers = { ...obj.headers, 'content-type': contentType };
      obj.headers = { 'content-type': contentType };
      obj.body = JSON.stringify(body);
    } else {
      obj.body = body;
    }
    const res: Response = await fetch(`${BaseUrl}` + url, obj);
    const data = await res.json();
    return data;
  },

  // put data fetcher
  put: async ({ url, contentType, body }: IFetcherParamsData) => {
    obj.method = 'PUT';
    if (contentType === 'application/json') {
      obj.headers = { 'content-type': contentType };
      obj.body = JSON.stringify(body);
    } else {
      obj.body = body;
    }
    const res: Response = await fetch(`${BaseUrl}` + url, obj);
    const data = await res.json();
    return data;
  },

  // delete data fetcher
  delete: async (url: string) => {
    obj.method = 'DELETE';
    const res: Response = await fetch(`${BaseUrl}` + url, obj);
    const data = await res.json();
    return data;
  },
};

export default fetcher;
