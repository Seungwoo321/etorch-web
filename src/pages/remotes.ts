import { http } from "@/lib/http"
import { Indicator } from "@/models/indicator"

export function getIndicators (): Promise<{ indicators: Indicator[] }> {
  return http.get('/indicators')
}
