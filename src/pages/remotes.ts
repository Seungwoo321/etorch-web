import { http } from "@/lib/http"
import { Indicator, Origin } from "@/models/indicator"

export function getOrigins (): Promise<{ origins: Origin[]}> {
  return http.get('/v1/origins')
}

export function getIndicators (origin: string): Promise<{ indicators: Indicator[] }> {
  return http.get(`/v1/indicators/${origin}`)
}
