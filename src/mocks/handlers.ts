import {
  type PathParams,
  type DefaultBodyType,
  type HttpResponseResolver,
  delay,
  http,
  HttpResponse,
  type JsonBodyType
} from 'msw'
import { kosisList, ecosList, oecdList, origins, dashboards } from './data'
import { generateMockData } from './utils/generateMockData'

function withDelay<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType
> (durationMs: number, resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (...args) => {
    await delay(durationMs)
    return await resolver(...args)
  }
}
interface IndicatorParamsType extends PathParams {
  origin: string
  code: string
  frequency: 'Y' | 'M' | 'D'
}

interface DashboardParamsType extends PathParams {
  id: string
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
  ),
  http.get<IndicatorParamsType, never, JsonBodyType>(
    '/v1/indicators/:origin/:code/:frequency',
    withDelay(300, ({ params }: { params: IndicatorParamsType }) => {
      const data = generateMockData(params.frequency)
      return HttpResponse.json({
        data
      })
    })
  ),
  http.post(
    '/v1/dashboard',
    withDelay(300, ({ params }) => {
      console.log(params)
      return HttpResponse.json(true)
    })
  ),
  http.get<never, never, JsonBodyType>(
    '/v1/dashboards',
    withDelay(300, () => {
      return HttpResponse.json({
        dashboards: dashboards.map(({ id, name }) => ({ id, name }))
      })
    })
  ),
  http.get<DashboardParamsType, never, JsonBodyType>(
    '/v1/dashboard/:id',
    withDelay(300, ({ params }: { params: DashboardParamsType }) => {
      return HttpResponse.json({
        dashboard: dashboards.find(({ id }) => id === params.id)
      })
    })
  )
]
