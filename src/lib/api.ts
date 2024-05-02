import { http } from "./http"
import { ChartData, IGetIndicatorData, Indicator } from "@/models/chartData"
import { INewDashboard, IUpdateDashboard, IChart, Dashboard } from '@/models/dashboard'
export function getIndicators (origin: string): Promise<{ indicators: Indicator[] }> {
  return http.get(`/v1/indicators/${origin}`)
}

export function getIndicatorData ({ origin, code, period }: IGetIndicatorData): Promise<{ data: ChartData }> {
  return http.get(`/v1/indicators/${origin}/${code}/${period}`)
}

export function createDashboard (dashboard: INewDashboard) {
  console.log('CreateDashboard', dashboard)
  return Promise.resolve([])
}

export function updateDashboard (dashboard: IUpdateDashboard<IChart>) {
  console.log('UpdateDashboard', dashboard)
  return Promise.resolve({})
}

export function getDashboards (): Promise<{ dashboards: Dashboard[] }> {
  return http.get('v1/dashboards')
}

export function getDashboardById (id: string): Promise<{ dashboard: Dashboard }> {
  return http.get(`/v1/dashboard/${id}`)
}

export function deleteDashboard (id: string) {
  console.log('deleteDashboard', id)
  return Promise.resolve(true)
}