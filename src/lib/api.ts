import { http } from "./http"
import { ChartData, IGetIndicatorData, Indicator } from "@/models/dataSetting"

export function getIndicators (origin: string): Promise<{ indicators: Indicator[] }> {
  return http.get(`/v1/indicators/${origin}`)
}

export function getIndicatorData ({ origin, code, period }: IGetIndicatorData): Promise<{ data: ChartData[] }> {
  return http.get(`/v1/indicators/${origin}/${code}/${period}`)
}