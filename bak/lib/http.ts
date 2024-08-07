import Axios from 'axios';
const axios = Axios.create();

export const http = {
  get: function httpGet<Response = unknown>(url: string) {
    return axios.get<Response>(url).then(res => res.data);
  },
  post: function httpPost<Request, Response = unknown>(url: string, data?: Request) {
    return axios.post<Response>(url, { data }).then(res => res.data);
  },
  delete: function httpDelete<Request, Response = unknown>(url: string, data?: Request) {
    return axios.delete<Response>(url, { data }).then(res => res.data);
  },
};