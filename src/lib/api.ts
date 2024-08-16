import { http } from './http'
import { type IndicatorValues, type IndicatorValuesParamss, type Indicator } from '@/models'

export async function getIndicators (origin: string): Promise<{ indicators: Indicator[] }> {
  return await http.get(`/v1/indicators/${origin}`)
}

export async function getIndicatorValues ({ origin, code, frequency }: IndicatorValuesParamss): Promise<{ data: IndicatorValues }> {
  return await http.get(`/v1/indicators/${origin}/${code}/${frequency}`)
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
