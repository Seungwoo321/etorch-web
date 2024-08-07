import { http } from "./http"
import { IndicatorValues, IndicatorValuesParamss, Indicator } from "@/models"

export function getIndicators (origin: string): Promise<{ indicators: Indicator[] }> {
  return http.get(`/v1/indicators/${origin}`)
}

export function getIndicatorValues ({ origin, code, frequency }: IndicatorValuesParamss): Promise<{ data: IndicatorValues }> {
  return http.get(`/v1/indicators/${origin}/${code}/${frequency}`)
}

// export function createDashboard (dashboard: INewDashboard) {
//   console.log('CreateDashboard', dashboard)
//   return Promise.resolve([])
// }

// export function updateDashboard (dashboard: IUpdateDashboard<IChart>) {
//   console.log('UpdateDashboard', dashboard)
//   return Promise.resolve({})
// }

// export function getDashboards (): Promise<{ dashboards: Dashboard[] }> {
//   return http.get('v1/dashboards')
// }

// export function getDashboardById (id: string): Promise<{ dashboard: Dashboard }> {
//   return http.get(`/v1/dashboard/${id}`)
// }

// export function deleteDashboard (id: string) {
//   console.log('deleteDashboard', id)
//   return Promise.resolve(true)
// }