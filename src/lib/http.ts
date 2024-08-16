import Axios from 'axios'
const axios = Axios.create()

export const http = {
  get: async function httpGet<Response = unknown> (url: string) {
    return await axios.get<Response>(url).then(res => res.data)
  },
  post: async function httpPost<Request, Response = unknown> (url: string, data?: Request) {
    return await axios.post<Response>(url, { data }).then(res => res.data)
  },
  delete: async function httpDelete<Request, Response = unknown> (url: string, data?: Request) {
    return await axios.delete<Response>(url, { data }).then(res => res.data)
  }
}
