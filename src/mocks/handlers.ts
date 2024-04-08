import {
  PathParams,
  DefaultBodyType,
  HttpResponseResolver,
  delay,
  http,
  HttpResponse,
  JsonBodyType,
} from 'msw'
import { kosisList, ecosList, oecdList, origins } from './data'

function withDelay<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType
>(durationMs: number, resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    await delay(durationMs)
    return resolver(...args)
  }
}

export const handlers = [
  http.get<never, never, JsonBodyType>(
    '/v1/indicators/kosis',
    withDelay(250, () => {
      return HttpResponse.json({
        indicators: kosisList
      })
    })
  ),
  http.get<never, never, JsonBodyType>(
    '/v1/indicators/ecos',
    withDelay(250, () => {
      return HttpResponse.json({
        indicators: ecosList
      })
    })
  ),
  http.get<never, never, JsonBodyType>(
    '/v1/indicators/oecd',
    withDelay(250, () => {
      return HttpResponse.json({
        indicators: oecdList
      })
    })
  ),
  http.get<never, never, JsonBodyType>(
    '/v1/origins',
    withDelay(100, () => {
      return HttpResponse.json({
        origins
      })
    })
  )
]
