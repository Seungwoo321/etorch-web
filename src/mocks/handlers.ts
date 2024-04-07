import {
  PathParams,
  DefaultBodyType,
  HttpResponseResolver,
  delay,
  http,
  HttpResponse,
  JsonBodyType,
} from 'msw'
import { indicators, origins } from './data'

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
        indicators
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
