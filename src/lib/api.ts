import { http } from "./http"
import { Indicator } from "@/models/dashboard"

export function getIndicators (origin: string): Promise<{ indicators: Indicator[] }> {
  return http.get(`/v1/indicators/${origin}`)
}
