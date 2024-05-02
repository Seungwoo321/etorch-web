import { Dashboard } from '@/models/dashboard'
import { create } from 'zustand'

interface DashboardStore {
  dashboardList: Dashboard[]
  currentDashboard: Dashboard | null
  updateCurrentDashboard: (currentDashboard: Dashboard) => void
  updateDashboardList: (dashboardList: Dashboard[]) => void
}

const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardList: [],
  currentDashboard: null,
  updateCurrentDashboard: (currentDashboard) => set(() => ({ currentDashboard })),
  updateDashboardList: (dashboardList) => set(() => ({ dashboardList }))
}))

export default useDashboardStore