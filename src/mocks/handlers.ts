import {
  PathParams,
  DefaultBodyType,
  HttpResponseResolver,
  delay,
  http,
  HttpResponse,
  JsonBodyType,
} from 'msw'
import { indicators } from './data'

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
    '/indicators',
    withDelay(250, () => {
      return HttpResponse.json({
        indicators
      })
    })
  ),
]